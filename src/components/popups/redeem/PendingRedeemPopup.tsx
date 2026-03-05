import { useEffect, useState } from 'react';
import BalanceUpdated from './components/BalanceUpdated';
import LowBalance from './components/LowBalance';
import RedemptionCancelled from './components/RedemptionCancelled';
import { toast } from 'react-toastify';
import Spinner from '@/components/ui/spinner';
import { motion } from 'framer-motion';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import { floorToTwoDecimals } from '@/lib/utils';

export interface BasePopupProps {
  onClose: () => void;
  onCancel?: () => Promise<void>;
  balance: number;
  pendingAmount: number;
}

export interface BaseAccount {
  redeemAmount: number;
  balance: number;
}

enum PopupTypes {
  BalanceUpdated = 'withdrawal.show_sw_balance_updated',
  LowBalance = 'withdrawal.show_sw_low_balance',
  RedeemCancelled = 'withdrawal.redeem_cancelled'
}

const Loader = () => (
  <div className="w-full h-full flex flex-col justify-center background-overlay bg-[#241056CC] relative z-[5]">
    <Spinner size={50} />
  </div>
);

const minute = 1000 * 60;

const Debouncer = () => {

  let isFirstTime = true;
	let timeSinceShown = 0;

	const clearStates = () => {
		isFirstTime = true;
		timeSinceShown = 0;
	}

  const set = (callback: () => void) => {
    if (isFirstTime) {
      isFirstTime = false;
			timeSinceShown = Date.now();
      callback();
      return;
    }
    if((Date.now() - timeSinceShown) / minute >= 1.0) {
			timeSinceShown = Date.now();
			callback();
		}
  };
  return { set, clearStates };
};

const PendingRedeemPopup = () => {
  const [type, setType] = useState<string | null>(null);
  const [accountData, setAccountData] = useState<BaseAccount>({
    redeemAmount: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(false);
  const debouncer = Debouncer();

  useEffect(() => {
    const parseEvent = (evt: MessageEvent) => {
      try {
        const {
          data: { name, data: eventData }
        } = evt;
				if (name === 'slot.unload' || name === 'slot.reload') {
					debouncer.clearStates();
					setType(null);
				}
        if (!Object.values(PopupTypes).includes(name)) return;
        if (name === PopupTypes.LowBalance) {
          debouncer.set(() => setType(name));
        } else {
          setType(name);
					debouncer.clearStates();
        }
        setAccountData(eventData);
      } catch (e) {
        return e;
      }
    };
    window.addEventListener('message', parseEvent);
    return () => {
      window.removeEventListener('message', parseEvent);
    };
  }, []);

  useEffect(() => {
    if (!type) return;
    sendBIEvent(TrackerEvents.PopupShown, {
      popup: { id: type.replace('withdrawal.', '').replace('show_sw_', '') }
    });
  }, [type]);

  const handleCancelClick = async () => {
    if (accountData) {
      try {
        setLoading(true);
        const response = await fetch(`${location.origin}/api/withdrawal/cancel`, {
          method: 'POST'
        });
				
        if (!response.ok) {
          toast.error('Cancelation failed.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          });
          return;
        }
        setType(PopupTypes.RedeemCancelled);
				debouncer.clearStates();
      } catch (error) {
        console.error('Error cancelling transaction:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
		sendBIEvent(TrackerEvents.PopupClosed, {
      popup: { id: (type ?? "").replace('withdrawal.', '').replace('show_sw_', '') }
    });
    setType(null);
  };

  const balance = floorToTwoDecimals(Number(accountData.balance) || 0);
  const pendingAmount = floorToTwoDecimals(Number(accountData.redeemAmount) || 0);
  return (
    <>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.225 }}
          className="absolute inset-0 w-full h-full z-[50]"
        >
          {type === PopupTypes.BalanceUpdated && (
            <BalanceUpdated
              onCancel={handleCancelClick}
              onClose={handleClose}
              balance={balance}
              pendingAmount={pendingAmount}
            />
          )}
          {type === PopupTypes.LowBalance && (
            <LowBalance
              onClose={handleClose}
              onCancel={handleCancelClick}
              balance={balance}
              pendingAmount={pendingAmount}
            />
          )}
          {type === PopupTypes.RedeemCancelled && (
            <RedemptionCancelled
              onClose={handleClose}
              balance={balance}
              pendingAmount={pendingAmount}
            />
          )}
          {loading && <Loader />}
        </motion.div>
      )}
    </>
  );
};

export default PendingRedeemPopup;
