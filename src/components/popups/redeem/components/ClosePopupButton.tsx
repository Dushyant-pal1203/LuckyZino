import { TrackerEvents } from '@/enum/trackers';
import { sendBIEvent } from '@/lib/trackers';

const ClosePopupButton = ({
  onClick,
  name = '',
  featureName = ''
}: {
  onClick: () => void;
  name?: string;
  featureName?: string;
}) => {
  const handleClick = () => {
    sendBIEvent(TrackerEvents.ButtonClicked, {
      button: { id: name, feature_name: featureName }
    });
    onClick();
  };
  return (
    <button
      className="close-button absolute top-[-1.5rem] right-[-1.5rem] w-[44px] h-[44px]"
      onClick={handleClick}
    >
      <img
        src="/withdrawal_imgs/CloseButton.png"
        alt="logo"
        className="rounded-full width-full height-full object-contain"
      />
    </button>
  );
};

export default ClosePopupButton;
