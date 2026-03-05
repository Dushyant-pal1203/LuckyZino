import { useState, useEffect, useCallback } from 'react';

interface UseTimerOptions {
  localStorageKey: string; // Key to save/retrieve timer data from localStorage
  cooldownTime: number; // Cooldown period in seconds
  autoStart?: boolean; // Whether to start the timer immediately
}

const useTimer = ({ localStorageKey, cooldownTime, autoStart = false }: UseTimerOptions) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to manually start the timer
  const startTimer = useCallback(() => {
    const expiryTime = Math.floor(Date.now() / 1000) + cooldownTime;
    localStorage.setItem(localStorageKey, JSON.stringify(expiryTime));
    setRemainingTime(cooldownTime);
  }, [cooldownTime, localStorageKey]);

  // Restore the timer from localStorage or start it if autoStart is true
  useEffect(() => {
    const savedTime = localStorage.getItem(localStorageKey);
    if (savedTime) {
      const parsedTime = JSON.parse(savedTime);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDiff = Math.max(parsedTime - currentTime, 0);
      setRemainingTime(timeDiff);
    } else if (autoStart) {
      startTimer();
    }
    setIsLoading(false);
  }, [localStorageKey, autoStart, startTimer]);

  // Update the timer every second
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          const updatedTime = prev - 1;

          if (updatedTime > 0) {
            const expiryTime = Math.floor(Date.now() / 1000) + updatedTime;
            localStorage.setItem(localStorageKey, JSON.stringify(expiryTime));
          } else {
            localStorage.removeItem(localStorageKey);
            clearInterval(timer);
          }

          return Math.max(updatedTime, 0);
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime, localStorageKey]);

  return { remainingTime, isTimerLoading: isLoading, startTimer };
};

export default useTimer;
