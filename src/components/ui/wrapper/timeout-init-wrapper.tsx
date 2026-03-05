'use client';

import { useEffect, useRef, useState } from 'react';

type TimeoutInitWrapperProps = {
  predicate: () => boolean;
  timeoutMs?: number;
  spinner: React.ReactNode;
  fallback: React.ReactNode;
  error?: unknown;
  children: React.ReactNode;
};

/**
 * Wrapper that renders children when predicate() returns true.
 * Shows spinner while waiting, and fallback either on error or timeout.
 */
export function TimeoutInitWrapper({
                                     predicate,
                                     timeoutMs = 60000,
                                     spinner,
                                     fallback,
                                     error,
                                     children,
                                   }: TimeoutInitWrapperProps) {
  const [ready, setReady] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (error) return;

    const isReady = predicate();
    if (isReady) {
      setReady(true);
      return;
    }

    setReady(false);
    setTimeoutReached(false);

    intervalRef.current = setInterval(() => {
      if (predicate()) {
        setReady(true);
        clearTimers();
      }
    }, 300);

    timeoutRef.current = setTimeout(() => {
      setTimeoutReached(true);
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }, timeoutMs);

    function clearTimers() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      clearTimers();
    };
  }, [timeoutMs, error, predicate]);

  if (error) return <>{fallback}</>;
  if (ready) return <>{children}</>;
  if (timeoutReached) return <>{fallback}</>;
  return <>{spinner}</>;
}
