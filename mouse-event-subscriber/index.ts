type EventData = {
  type: string;
  x?: number;
  y?: number;
  deltaX?: number;
  deltaY?: number;
};

/**
 * Example of usage:
 * const subscriber = (new MouseEventSubscriber(canvas)).initialize();
 * subscriber.destroy();
 */
export default class Index {
  static events = [
    'mousedown',
    'mouseup',
    'mousemove',
    'click',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'wheel'
  ];

  static dispatch(canvas: HTMLCanvasElement | null, data: EventData) {
    if (!canvas || data.x === undefined || data.y === undefined) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = rect.left + data.x * rect.width;
    const clientY = rect.top + data.y * rect.height;

    let event: Event;
    if (data.type.startsWith('mouse')) {
      event = new MouseEvent(data.type, { clientX, clientY, bubbles: true });
    } else if (data.type.startsWith('touch')) {
      // Create a synthetic touch event
      const touch = new Touch({
        identifier: Date.now(),
        target: canvas,
        clientX,
        clientY,
        pageX: clientX,
        pageY: clientY,
        screenX: clientX,
        screenY: clientY,
        radiusX: 1,
        radiusY: 1,
        rotationAngle: 0,
        force: 1.0
      });

      event = new TouchEvent(data.type, {
        touches: [touch],
        targetTouches: [touch],
        changedTouches: [touch],
        bubbles: true,
        cancelable: true
      });
    } else if (data.type === 'wheel') {
      event = new WheelEvent(
        'wheel',
        {
          deltaX: data.deltaX || 0,
          deltaY: data.deltaY || 0,
          bubbles: true,
          cancelable: true
        },
      );
    } else {
      event = new PointerEvent(
        data.type,
        {
          clientX,
          clientY,
          screenX: clientX,
          screenY: clientY,
          bubbles: true,
          cancelable: true,
          composed: true,
          view: window,
        },
      );
    }

    canvas.dispatchEvent(event);
  }

  constructor(private readonly canvas: HTMLCanvasElement) {
  }

  initialize(): Index {
    window.addEventListener('message', this.handleMessage.bind(this));
    return this;
  }

  destroy(): void {
    window.removeEventListener('message', this.handleMessage.bind(this));
  }

  private handleMessage(event: EventData): void {
    event = event instanceof MessageEvent ? event.data : event;
    if (!event || Index.events.indexOf(event.type) === -1) {
      return;
    }
    Index.dispatch(this.canvas, event);
  }
}
