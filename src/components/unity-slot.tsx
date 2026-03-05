import { Unity } from 'react-unity-webgl';
import { ForwardedRef, forwardRef, useEffect, memo } from 'react';
import withScalingEvents from '@/hocs/with-scaling-events';
import useUnityLoader, {
  IUnityProviderConfig,
  UnityInstanceType
} from '@/hooks/use-unity-loader';
import withUnityConfig from '@/hocs/with-unity-config';
import LZLoader from './ui/lz-loader/lz-loader';
import useInteractionContext from '@/hooks/useInteractionContext';
import { useSlotsTracking } from '@/hooks/use-slots-tracking';
import { SlotData } from '@/types/slot';

export interface UnitySlotProps {
	url: string;
  slot: SlotData;
  token: string;
	userId: string;
  companyName?: string;
  productName?: string;
  productVersion?: string;
  paddingTop?: number;
  paddingRight?: number;
  unityConfig?: IUnityProviderConfig;
}

// 2. Wrap forwardRef with memo
const UnitySlot = memo(
  forwardRef<HTMLCanvasElement, UnitySlotProps>(
    (props: UnitySlotProps, ref: ForwardedRef<HTMLCanvasElement>) => {
      const {
				url,
        slot,
				userId,
        token,
        companyName,
        productName,
        productVersion,
        paddingTop,
        paddingRight,
        unityConfig
      } = props;

      const slotListener = useSlotsTracking();
      
      useEffect(() => {
        if (ref && 'current' in ref && ref.current && slot) {
          slotListener.subscribe(ref.current, slot);
        }
        return () => {
          slotListener.unsubscribe();
        };
      }, []);

      const { unityProvider, loadingProgression, isLoaded, unload } =
        useUnityLoader(
          url,
          {
            instanceType: UnityInstanceType.SLOT_INSTANCE,
            companyName,
            productName,
            productVersion,
            token,
						userId
          },
          unityConfig
        );

      const { isPointerEventsEnabled } = useInteractionContext();

      useEffect(() => {
        return () => {
          if (!isLoaded) return;
          unload()
            .then(() => console.log('Slot Unity app unloaded.'))
            .catch(console.error);
        };
      }, [unload, isLoaded]);

      return (
        <div
          className="relative w-full h-[100%]"
          style={{
            paddingTop: paddingTop || 40,
            paddingRight: paddingRight || 0,
            pointerEvents: isPointerEventsEnabled ? 'all' : 'none'
          }}
        >
          {!isLoaded && (
            <div
              style={{
                right: paddingRight || 0
              }}
              className="text-center absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-0"
            >
              <LZLoader loadingProgression={loadingProgression}></LZLoader>
            </div>
          )}
					<slot name='unity-slot'>
						<Unity
							ref={ref}
							unityProvider={unityProvider}
							devicePixelRatio={Math.min(window.devicePixelRatio, 2)}
							className="inset-0 w-full h-full z-0"
							style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
						/>
					</slot>
        </div>
      );
    }
  ),

  (prevProps, nextProps) => {
    return (
			prevProps.url === nextProps.url && 
      prevProps.slot.slotId === nextProps.slot.slotId &&
      prevProps.userId === nextProps.userId &&
      prevProps.token === nextProps.token &&
      prevProps.paddingTop === nextProps.paddingTop &&
      prevProps.paddingRight === nextProps.paddingRight &&
      prevProps.productVersion === nextProps.productVersion && 
      prevProps.companyName === nextProps.companyName
    );
  }
);

UnitySlot.displayName = 'UnitySlot';

export default withUnityConfig(withScalingEvents(UnitySlot));