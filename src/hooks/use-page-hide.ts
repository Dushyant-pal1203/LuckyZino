import { useEffect } from 'react';

export const usePageExit = (onExit: (reason:string) => void, deps: any) => {
	useEffect(() => {
		let isSent = false;
		// 1. Handle standard "Page Hide" (Tab close / Navigation)
		const handlePageHide = (event: PageTransitionEvent) => {
			// If persisted is true, page is just cached (bfcache), not destroyed
			if (!event.persisted && !isSent) {
				onExit('close_tab/switch_tab/reload_tab');
				isSent = true;
			}
		};

		// 2. Handle "App Backgrounding" (Home button / App Switcher)
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'hidden' && !isSent) {
				onExit('browser_hide');
				isSent = true;
			}
		};

		window.addEventListener('pagehide', handlePageHide);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener('pagehide', handlePageHide);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [onExit, ...deps]);
};