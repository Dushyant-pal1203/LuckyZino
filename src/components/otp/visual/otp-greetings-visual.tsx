import { useViewportFromParent } from '@/hooks/viewport/useParentWindowViewport';

/**
 * OtpGreetingsVisual component
 *
 * Displays a decorative visual for the OTP screen:
 * - Shine effect in the background
 * - Stack of gold coins
 * - Mascot character image (Lana)
 */
export default function OtpGreetingsVisual(){
  // Get parent window viewport to determine responsive layout
  const viewport = useViewportFromParent();
  const isMobile = viewport?.width !== undefined ? viewport.width < 520 : false;

  const elements = isMobile ? 150 : 200;
  return (
    <div className="relative flex items-center justify-center">
      <img src="/images/common/effects/shine/white-shine.png" className="opacity-60 absolute z-0 right-3" alt="shine"/>
      <img src="/images/common/coins/two-sides-gold-coins.png" className={`relative z-10 h-[${elements}px] object-contain right-2`} alt="coins" />
      <img src="/images/common/characters/lana-red-cut.png" className={`absolute z-20 h-[${elements}px] object-contain bottom-0`} alt="mascot" />
    </div>
  )
}