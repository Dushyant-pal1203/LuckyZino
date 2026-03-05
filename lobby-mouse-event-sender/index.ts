import { SlotData } from '../src/types/slot';
import { RefObject } from 'react';

type ThrottleState = {
  lastSentTime: number;
  lastEvent: Event | null;
  sendScheduled: boolean;
  useRaf?: boolean;
};

export type EventData = {
  type: string;
  x?: number;
  y?: number;
  deltaX?: number;
  deltaY?: number;
};

export default class Index {
  private static mouseEvents = ['mousedown', 'mouseup', 'mousemove', 'click'];
  private static touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
  private static wheelEvents = ['wheel'];

  // Event types that need throttling:
  // - mousemove and touchmove use time-based throttling.
  // - wheel uses requestAnimationFrame throttling (useRaf: true).
  private static throttledEventsConfig = new Map<string, { useRaf?: boolean }>([
    ['mousemove', { useRaf: false }],
    ['touchmove', { useRaf: false }],
    ['wheel', { useRaf: true }],
  ]);

  private throttleStates: Map<string, ThrottleState> = new Map();
  private slot: SlotData | null = null;

  // Handlers references to add/remove events properly
  private mouseHandler = (e: Event) => this.handleEvent(e);
  private touchHandler = (e: Event) => this.handleEvent(e);
  private wheelHandler = (e: Event) => this.handleEvent(e);

  constructor(
    private readonly lobbyCanvas: HTMLCanvasElement,
    private readonly callback?: ((data: EventData) => void) | null,
    private readonly unitySlotCanvas?: RefObject<HTMLCanvasElement> | HTMLCanvasElement | null,
    private readonly iframeSlot?: RefObject<HTMLIFrameElement> | HTMLIFrameElement | null,
    private readonly throttleInterval: number = 50
  ) {
    // Initialize throttle states for all throttled events
    Index.throttledEventsConfig.forEach((config, type) => {
      this.throttleStates.set(type, {
        lastSentTime: 0,
        lastEvent: null,
        sendScheduled: false,
        useRaf: config.useRaf,
      });
    });
  }

  /**
   * Sets the slot context so that events can be forwarded accordingly.
   */
  setSlotContext(slot: SlotData | null) {
    this.slot = slot;

    return this;
  }

  initialize(): Index {
    Index.mouseEvents.forEach((type) => {
      this.lobbyCanvas.addEventListener(type, this.mouseHandler);
    });

    Index.touchEvents.forEach((type) => {
      this.lobbyCanvas.addEventListener(type, this.touchHandler);
    });

    Index.wheelEvents.forEach((type) => {
      this.lobbyCanvas.addEventListener(type, this.wheelHandler);
    });

    return this;
  }

  destroy(): void {
    Index.mouseEvents.forEach((type) => {
      this.lobbyCanvas.removeEventListener(type, this.mouseHandler);
    });

    Index.touchEvents.forEach((type) => {
      this.lobbyCanvas.removeEventListener(type, this.touchHandler);
    });

    Index.wheelEvents.forEach((type) => {
      this.lobbyCanvas.removeEventListener(type, this.wheelHandler);
    });
  }

  private handleEvent(e: Event) {
    const isThrottled = this.throttleStates.has(e.type);
    if (!isThrottled) {
      // Non-throttled events are sent immediately
      this.sendEvent(e);
      return;
    }

    const throttleState = this.throttleStates.get(e.type)!;

    // For move and wheel events, we throttle
    if (throttleState.useRaf) {
      // Wheel event with requestAnimationFrame throttling
      throttleState.lastEvent = e;
      if (!throttleState.sendScheduled) {
        throttleState.sendScheduled = true;
        requestAnimationFrame(() => {
          if (throttleState.lastEvent) {
            this.sendEvent(throttleState.lastEvent);
            throttleState.lastEvent = null;
          }
          throttleState.sendScheduled = false;
        });
      }
    } else {
      // Time-based throttling for mousemove, touchmove
      if (e.type === 'mousemove' || e.type === 'touchmove') {
        throttleState.lastEvent = e;
        const now = performance.now();
        if (now - throttleState.lastSentTime > this.throttleInterval) {
          this.sendEvent(throttleState.lastEvent);
          throttleState.lastEvent = null;
          throttleState.lastSentTime = now;
        } else {
          this.scheduleTimeBasedSend(e.type);
        }
      } else {
        // Other throttled events (if any) would be sent immediately
        this.sendEvent(e);
      }
    }
  }

  private scheduleTimeBasedSend(eventType: string) {
    const throttleState = this.throttleStates.get(eventType);
    if (!throttleState || throttleState.sendScheduled) return;

    throttleState.sendScheduled = true;
    const now = performance.now();
    const delay = Math.max(0, this.throttleInterval - (now - throttleState.lastSentTime));

    setTimeout(() => {
      if (throttleState.lastEvent) {
        this.sendEvent(throttleState.lastEvent);
        throttleState.lastEvent = null;
      }
      throttleState.lastSentTime = performance.now();
      throttleState.sendScheduled = false;
    }, delay);
  }

  private sendEvent(e: Event | null) {
    if (!e || !this.slot) return;

    let data: EventData;

    if (e.type === 'wheel') {
      const we = e as WheelEvent;
      data = {
        type: e.type,
        deltaX: we.deltaX,
        deltaY: we.deltaY
      };
    } else {
      const rect = this.lobbyCanvas.getBoundingClientRect();
      const { x, y } = this.normalizeCoordinates(e, rect);
      data = { type: e.type, x, y };
    }
    // Forward event based on slot type
    if (
      this.slot.loadType === 'unity_canvas' && this.callback
      && (this.unitySlotCanvas instanceof HTMLCanvasElement || this.unitySlotCanvas?.current)
    ) {
      this.callback(data);
    } else if (
      this.slot.loadType === 'iframe'
      && (this.iframeSlot instanceof HTMLIFrameElement || this.iframeSlot?.current)
    ) {
      const iframe = this.iframeSlot instanceof HTMLIFrameElement ? this.iframeSlot : this.iframeSlot.current;
      iframe?.contentWindow?.focus();
      iframe?.contentWindow?.postMessage(data, '*');
    }
  }

  private normalizeCoordinates(event: Event, rect: DOMRect) {
    if (event instanceof MouseEvent) {
      return {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      const touch = event.touches[0];
      return {
        x: (touch.clientX - rect.left) / rect.width,
        y: (touch.clientY - rect.top) / rect.height,
      };
    }
    return { x: 0, y: 0 };
  }
}
