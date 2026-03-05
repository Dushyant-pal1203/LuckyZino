import withScalingEvents from '@/hocs/with-scaling-events';
import useInteractionContext from '@/hooks/useInteractionContext';
import { isAndroidUserAgent, isIOSUserAgent } from '@/lib/utils';
import { ForwardedRef, forwardRef, useEffect, memo, useState } from 'react';
import { useSlotsTracking } from '@/hooks/use-slots-tracking';
import withClickedAreas from '@/hocs/with-clicked-areas';
import { SlotData } from '@/types/slot';
import { SLOTS_WITHOUT_ORIGIN } from '@/constants/game';
import Spinner from './ui/spinner';

interface IFrameSlotProps {
  slot: SlotData;
  paddingTop?: number;
  paddingRight?: number;
  lobbyCanvas?: any;
}

const IFrameSlot = memo(
  forwardRef<HTMLIFrameElement, IFrameSlotProps>(
    (props: IFrameSlotProps, ref: ForwardedRef<HTMLIFrameElement>) => {
      const [isLoading, setLoading] = useState(true);
      const { slot, paddingTop, paddingRight } = props;

      const { isPointerEventsEnabled } = useInteractionContext();

      const iframeListener = useSlotsTracking();

      useEffect(() => {
        if (ref && 'current' in ref && ref.current && slot) {
          iframeListener.subscribe(ref.current, slot);
        }
        return () => {
          iframeListener.unsubscribe();
        };
      }, [slot]);

      const url =
        slot.url +
        (SLOTS_WITHOUT_ORIGIN.includes(slot.slotOwner)
          ? ''
          : `&origin=${window.origin}`);

      return (
        <div
          className="relative w-full h-full flex flex-col justify-end"
          style={{
            paddingTop:
              isIOSUserAgent() || isAndroidUserAgent() ? 0 : paddingTop,
            paddingRight:
              isIOSUserAgent() || isAndroidUserAgent() ? 0 : paddingRight,
            pointerEvents: isPointerEventsEnabled ? 'all' : 'none',
            backgroundColor: isLoading ? '#00000050' : 'none'
          }}
        >
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center">
              <Spinner size={60} />
            </div>
          )}
          <iframe
            ref={ref}
            src={url}
            onLoad={() => setLoading(false)}
            id="iframe-slot-el"
            allow="geolocation *; clipboard-read *; clipboard-write *; bluetooth *; accelerometer *; gyroscope *"
            scrolling="no"
            className="z-0 h-full w-full"
            style={{
              width:
                isIOSUserAgent() || isAndroidUserAgent()
                  ? document.body.clientWidth - (paddingRight || 0)
                  : '100%',
              height:
                isIOSUserAgent() || isAndroidUserAgent()
                  ? document.body.clientHeight - (paddingTop || 0)
                  : '100%'
            }}
          />
        </div>
      );
    }
  ),

  (prevProps, nextProps) => {
    return (
			prevProps.slot.url === nextProps.slot.url &&
      prevProps.slot.slotId === nextProps.slot.slotId &&
      prevProps.paddingTop === nextProps.paddingTop &&
      prevProps.paddingRight === nextProps.paddingRight &&
      prevProps.lobbyCanvas === nextProps.lobbyCanvas
    );
  }
);

IFrameSlot.displayName = 'IFrameSlot';

export default withScalingEvents(withClickedAreas(IFrameSlot));
