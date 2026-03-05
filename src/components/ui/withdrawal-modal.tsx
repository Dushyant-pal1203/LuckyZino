import { useEffect, useState } from 'react';
import Modal from '../ui/modal';
import Spinner from './spinner';

export const WithdrawalModal = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleMassage = async (message: MessageEvent) => {
    let eventData = message.data;
    if (eventData && typeof eventData === 'string') {
      try {
        eventData = JSON.parse(eventData);
      } catch {
        console.error('Invalid JSON data:', eventData);
        return;
      }
    }
		const {name} = eventData;
		if (name === 'withdrawal.open') {
      setModalOpen(true);
		}
		if (name === 'withdrawal.close_form_modal') {
      window.postMessage({name: 'withdrawal.new_account_added', data: {}}, '*');
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
      <iframe onLoad={() => setLoading(false)} className={`w-full h-full bg-transparent overflow-auto ${loading ? 'opacity-0': ''}`} src={`/withdrawal`}></iframe>
			{loading && <div className='flex flex-column justify-center absolute w-full h-full'><Spinner size={100}></Spinner></div>}
    </Modal>
  );
};
