import { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import Spinner from './spinner';

export const KYC_Modal = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [tier, setTier] = useState('');
	const [loading, setLoading] = useState(true);
	
	const handleMassage = (message: MessageEvent) => {
    let eventData = message.data;
    if (eventData && typeof eventData === 'string') {
      try {
        eventData = JSON.parse(eventData);
      } catch {
        console.error('Invalid JSON data:', eventData);
        return;
      }
    }
		const {name, tier} = eventData;
		if (name === 'kyc.open_form_modal') {
			setModalOpen(true);
			setTier(tier);
		}
		if (name === 'kyc.close_form_modal') {
      switch (tier) {
        case 'deposit':
          console.log('Deposit compliance succeeded');
          window.postMessage({name: 'kyc.deposit_compliance_succeeded', data: {}}, '*');
          break;
        case 'withdrawal':
          window.postMessage({name: 'withdrawal.open'}, '*');
          break;
        default:
          break;
      }
			setModalOpen(false);
		}
	}

  useEffect(() => {
    window.addEventListener('message', handleMassage);
    return () => {
      window.removeEventListener('message', handleMassage);
    };
  }, []);

	const onClose = () => {
		setModalOpen(false);
	};

  return (
    <Modal
      contentClass="!bg-[#2e156ede]"
      modalBodyClass="flex flex-column justify-center"
      isOpen={modalOpen}
      onClose={onClose}
    >
      <iframe onLoad={() => setLoading(false)} className={`w-[100vw] h-full bg-transparent overflow-auto ${loading ? 'opacity-0': ''}`} src={`/compliance/${tier}`}></iframe>
			{loading && <div className='flex flex-column justify-center absolute w-full h-full'><Spinner size={100}></Spinner></div>}
    </Modal>
  );
};
