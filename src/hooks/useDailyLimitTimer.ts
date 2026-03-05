'use client';
import { useState, useEffect } from 'react';

export const useDailyLimitTimer = (dailyLimit: string) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      if (!dailyLimit || dailyLimit === '') {
        setTimeLeft('');
        return;
      }

      const now = new Date();
      const resetTime = new Date(dailyLimit);
      const diff = resetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('');
        window.parent.postMessage({ name: 'withdrawal.close_form_modal' }, '*');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [dailyLimit]);

  return timeLeft;
};