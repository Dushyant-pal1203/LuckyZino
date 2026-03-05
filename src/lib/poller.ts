export interface IPollerControls {
  start: () => void;
  stop: () => void;
}

export function createPolling(
  requestFunction: () => Promise<unknown>,
  interval: number
): IPollerControls {

  let timerId: ReturnType<typeof setTimeout> | null = null;

  const poll = async (): Promise<void> => {
    try {
      const ok = await requestFunction();
      if(ok) {
				timerId = setTimeout(poll, interval);
			}

    } catch (error) {
			stop();
			console.log('Polling error ', error);
			return;
    }
  };

  const start = (): void => {
    if (timerId === null) {
      poll(); 
    }
  };

  const stop = (): void => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return { start, stop };
}