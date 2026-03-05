'use client';
import { UIEvents } from '@/enum/ui';
import { useEffect } from 'react';

const useTabListener = () => {
  useEffect(() => {
    const channel = new BroadcastChannel('tabdata');
    channel.addEventListener('message', (event) => {
      if (document.hasFocus()) {
        // This tab is currently being used by the user, so ignore the update
        return;
      }
      const { data } = event;
      console.log(data);
      if (data.name === UIEvents.RedirectToNeutralTab) {
        window.open(`${window.location.origin}/lp/v10`, '_self');
      }
    });
    channel.postMessage({ name: UIEvents.RedirectToNeutralTab });
    return () => {
      channel.close();
    };
  }, []);
}

export default useTabListener;