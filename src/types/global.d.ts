import type LobbyEventManager from '@/lib/lobby-event-manager';

declare global {
  interface Window {
    __lobbyEventManager?: LobbyEventManager;
    SocureDocVSDK?: any;
		hsCurrentUnreadCount?: any;
		Adjust?: any;
		lobbyTopPanelSize?: number;
		lobbySidePanelSize?: number;
		EvolutionGaming: {
			init: (params: object) => void;
		}
  }
}

export {};
