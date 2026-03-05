import { RefObject } from 'react';
import { SlotData } from '@/types/slot';
import { PaymentStatus } from '@/types/payments';
import { PaymentEvents } from '@/enum/payments';
import { UIEvents } from '@/enum/ui';
import { signOut } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { User } from '@/types/user';
import { isAndroidUserAgent, floorToTwoDecimals } from './utils';
import { sendBIEvent } from '@/lib/trackers';
import { IEventData } from '@/hocs/with-clicked-areas';

export const KYC_DEPOSIT_COMPLIANCE_PRICE_AMOUNT = 'kyc.deposit_compliance_price_amount';

export default class LobbyEventManager {
	private accessToken?: string;
	private user?: User;
	private currentInteractionContext: string | null = null;
	private isFullSceenMode: boolean = false;
	private tempSlotData: SlotData | null = null;

	constructor(
		private readonly wrapRef: RefObject<HTMLDivElement>,
		private readonly lobbyRef: RefObject<HTMLCanvasElement>,
		private readonly setSlot: (slot: SlotData | null) => void,
		private readonly setPointerEvent: (pointer: boolean) => void,
		private readonly router: AppRouterInstance,
		private readonly iframeRef?: RefObject<HTMLIFrameElement> | null
	) {
	}

	/**
	 * Sets the access token to be sent to the Unity instance.
	 */
	setAccessToken(accessToken: string): this {
		this.accessToken = accessToken;
		return this;
	}

	setUser(user: User) {
		this.user = user;
	}

	/**
	 * Initializes the message handler for iframe management.
	 */
	initialize(): this {
		window.addEventListener('message', this.handleMessage.bind(this));
		this.initializeHelpShiftEvents();
		return this;
	}

	initializeMouseEvents(): this {
		this.wrapRef.current?.addEventListener(
			'pointerdown',
			this.mouseHandler.bind(this)
		);
		this.wrapRef.current?.addEventListener(
			'pointermove',
			this.mouseMoveHandler.bind(this)
		);

		return this;
	}

	/**
	 * Cleans up the message handler.
	 */
	destroy(): void {
		window.removeEventListener('message', this.handleMessage.bind(this));
		this.wrapRef.current?.removeEventListener(
			'pointerdown',
			this.mouseHandler.bind(this)
		);
		this.wrapRef.current?.removeEventListener(
			'pointermove',
			this.mouseMoveHandler.bind(this)
		);
		this.removeHelpShiftEvents();
	}

	initializeHelpShiftEvents(): void {
		if (!(window as any).HelpshiftWidget) return;
		(window as any).HelpshiftWidget(
			"addEventListener",
			"newUnreadMessages",
			this.sendSupportUnreadCount.bind(this)
		);
	}

	removeHelpShiftEvents(): void {
		if (!(window as any).HelpshiftWidget) return;
		(window as any).HelpshiftWidget(
			"removeEventListener",
			"newUnreadMessages",
			this.sendSupportUnreadCount.bind(this)
		);
	}

	setIneractContext(context: string) {
		this.currentInteractionContext = context;
	}

	/**
	 * Sends a new access token to the Unity instance.
	 */
	sendAccessToken(): void {
		window.postMessage({
			name: 'common.new_access_token',
			data: { accessToken: this.accessToken }
		}, window.origin);
	}

	/**
	 * Handles incoming messages and dispatches actions.
	 */
	private handleMessage = (event: MessageEvent): void => {
		if (event.origin !== window.origin && event.origin !== process.env.NEXT_PUBLIC_SLOT_CDN_ORIGIN) {
			return;
		}

		let eventData = event.data;
		if (eventData && typeof eventData === 'string') {
			try {
				eventData = JSON.parse(eventData);
			} catch {
				console.error('Invalid JSON data:', eventData);
				return;
			}
		}

		if (eventData && eventData.action === 'initialize' && this.iframeRef) {
			this.iframeRef.current?.contentWindow?.postMessage(
				JSON.stringify({ msgId: 'broadcastToCasino' }),
				process.env.NEXT_PUBLIC_SLOT_CDN_ORIGIN as string
			);
		}

		/** Handle messages from Pixi Slot */
		if (eventData && eventData.msgId) {
			switch (eventData.msgId) {
				case 'rg2xcLeGaBalanceUpdated':
				case 'rg2xcGameBalanceUpdated':
					if (eventData.value && (typeof eventData.value.balance === 'number')) {
						window.postMessage({
							name: 'lobby.balance_update',
							data: { balance: eventData.value.balance }
						}, window.origin);
					}
					break;
				default:
					break;
			}
			return;
		}

		if (!eventData || typeof eventData.name !== 'string') {
			return;
		}

		const { name, data } = eventData;
		switch (name) {
			case 'slot.load':
				this.setTempslotData(data as SlotData);
				this.handleSlotLoad(data as SlotData);
				break;
			case 'slot.unload':
				this.setTempslotData(null);
				this.handleSlotUnload();
				break;
			case 'slot.iframe_force_reload':
				if (this.tempSlotData?.loadType === 'iframe') {
					window.postMessage({ name: 'slot.new_session', data: this.tempSlotData });
				}
				break;
			case 'ui.change_interaction_context':
				this.currentInteractionContext = data?.context ?? null;
				break;
			case 'common.toggle_fullscreen':
				this.toggleFullscreen();
				break;
			case UIEvents.TopPanelSizeChange:
				window.lobbyTopPanelSize = floorToTwoDecimals(data.height / window.devicePixelRatio);
				break;
			case UIEvents.SidePanelSizeChange:
				window.lobbySidePanelSize = floorToTwoDecimals(data.width / window.devicePixelRatio);
				break;
			case 'common.request_access_token':
				this.sendAccessToken();
				break;
			case 'common.initialize_hs_events':
				this.initializeHelpShiftEvents();
				this.sendSupportUnreadCount({ unreadCount: window?.hsCurrentUnreadCount ?? 0 });
				break;
			case 'common.show_support':
				this.initializeHSScripts(eventData);
				this.openHSWidget();
				break;
			case 'common.support_get_unread_count':
				this.sendSupportUnreadCount({ unreadCount: window.localStorage.getItem('hsCurrentUnreadCount') ?? 0 });
				break;
			case 'common.server_event':
				this.handleServerEvent(data);
				break;
			case 'user.open_amoe_chat':
				this.initializeHSScripts(eventData);
				this.predefineUserMessage(data.fullName);
				this.openHSWidget();
				break;
			case 'user.logout':
				localStorage.removeItem('userId');
				signOut({ redirectTo: "/game" });
				break;
			case 'user.open_forgot_password':
				window.open(`${window.location.origin}/forgot-password`, '_self');
				break;
			case 'terms_and_conditions.open':
				window.open(`${window.location.origin}/terms-and-conditions?fromlobby=true`, '_blank');
				break;
			case PaymentEvents.PaymentCancelIframe:
				this.handlePayment(data);
				break;
			case PaymentEvents.PaymentFailedIframe:
				this.handlePayment(data);
				break;
			case 'kyc.launch_deposit_compliance':
				this.launchDepositCompliance(data);
				break;
			case 'common.redirect_to_page':
				if (data?.target === '_blank') {
					window.open(`${window.location.origin}${data.url}?fromlobby=true`, '_blank');
					return;
				}
				this.router.replace(data.url);
				break;
			case UIEvents.AddClickedArea:
				const rectData: IEventData = data;
				if (!(window as any).__clickableRects) {
					(window as any).__clickableRects = [];
				}
				(window as any).__clickableRects.push(rectData);
				break;
			default:
				break;
		}
	};

	private setTempslotData(data: SlotData | null) {
		this.tempSlotData = JSON.parse(JSON.stringify(data));
	}

	private initializeHSScripts(query: object) {
		if ((window as any).HelpshiftWidget && (window as any).helpShiftInited) return;
		window.postMessage({ name: 'common.initialize_hs_scripts', data: query });
	}

	private predefineUserMessage(fullName: string) {
		if (!(window as any).HelpshiftWidget) return;
		const widget = document.querySelector('#hs-widget-iframe') as unknown as {
			contentWindow: { postMessage: (data: any, domain?: string) => void }
		};

		widget?.contentWindow?.postMessage(
			JSON.stringify({
				type: "call-webchat-js-api",
				data: {
					apiName: "setInitialUserMessage",
					apiArgs: `Mail-In Code request for ${this.user?.email}, ${fullName}. #sws_amoe_request_code`
				}
			}),
			"*"
		);
		setTimeout(() => {
			widget?.contentWindow?.postMessage(
				JSON.stringify({
					type: "call-webchat-js-api",
					data: {
						apiName: "open"
					}
				}),
				"*"
			);
		}, 200);
	}

	private openHSWidget() {
		if (!(window as any).HelpshiftWidget) return;
		(window as any).HelpshiftWidget("show");
		(window as any).HelpshiftWidget("open");
		sendBIEvent('site-button-clicked', {
			button: { id: 'support', feature_name: 'main_page' }
		});
	}

	/**
	 * Handles Payment Status Events
	 */
	private handlePayment(data: PaymentStatus) {
		if (!data) return;

		if (data.status === "cancel") {
			return window.postMessage(
				{
					name: PaymentEvents.PaymentCancel,
					data: {
						sessionId: data?.id,
						provider: data.provider,
					},
				},
				window.origin
			);
		}

		if (data.status !== "cancel") {
			return window.postMessage(
				{
					name: PaymentEvents.PaymentFailed,
					data: {
						status: data.status,
						sessionId: data?.id,
						provider: data.provider,
					},
				},
				window.origin
			);
		}
	}

	/**
	 * Handles loading the slot iframe with the provided data.
	 */
	private handleSlotLoad(data: SlotData): void {
		if (!data || !data.url || !data.loadType) {
			console.error('Invalid data for slot.load:', data);
			return;
		}
		if (data.loadType === 'unity_canvas') {
			data.url = data.url.replace('index.html', '');
		}
		this.setSlot(data);
		if (isAndroidUserAgent() && !this.isFullSceenMode) {
			setTimeout(() => { this.toggleFullscreen() }, 100);
		}
	}

	/**
	 * Handles unloading the slot iframe.
	 */
	private handleSlotUnload(exitFullScreen: boolean = true): void {
		this.setSlot(null);
		if (isAndroidUserAgent() && this.isFullSceenMode && exitFullScreen) {
			setTimeout(() => { this.toggleFullscreen() }, 100);
		}
	}

	/**
	 * Toggles the fullscreen mode of the wrapper.
	 */
	private async toggleFullscreen(): Promise<void> {
		try {
			if (!document.fullscreenElement && !this.isFullSceenMode) {
				await document.body.requestFullscreen();
				this.isFullSceenMode = true;
			} else if (document.fullscreenElement) {
				await document.exitFullscreen();
				this.isFullSceenMode = false;
			} else {
				this.isFullSceenMode = false;
			}
		} catch (err) {
			console.error(`Error attempting to enable fullscreen mode: ${(err as Error).message}`);
			this.isFullSceenMode = false;
		}
	};

	/**
	 * Handles mouse events and sends them to the Unity instance.
	 */
	private mouseMoveHandler = this.throttle((event: MouseEvent) => {
		this.mouseHandler(event);
	}, 100);

	/**
	 * Throttles the provided function to limit the number of calls.
	 */
	private throttle<T extends (...args: any[]) => void>(
		func: T,
		limit: number
	): (...args: Parameters<T>) => void {
		let lastCall = 0;

		return function (...args: Parameters<T>) {
			const now = Date.now();
			if (now - lastCall >= limit) {
				lastCall = now;
				func(...args);
			}
		};
	}

	/**
	 * Handles mouse events and sends them to the Unity instance.
	 */
	private mouseHandler(event: MouseEvent): void {
		const { clientX, clientY } = event;
		const isTransparent = this.isPixelTransparentWebGL2(clientX, clientY);
		this.setPointerEvent(isTransparent);
	}

	/**
	 * Checks if the pixel at the provided coordinates is transparent.
	 */
	private isPixelTransparentWebGL2(x: number, y: number): boolean {
		const canvas = this.lobbyRef.current;
		if (!canvas || this.currentInteractionContext === 'lobby') return false;

		const gl = canvas.getContext('webgl2');
		if (!gl) {
			console.error('WebGL2 not supported');
			return false;
		}

		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;

		const canvasX = Math.floor((x - rect.left) * dpr);
		const canvasY = Math.floor((rect.bottom - y) * dpr);

		gl.flush();
		gl.finish();

		const framebufferStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if (framebufferStatus !== gl.FRAMEBUFFER_COMPLETE) {
			return false;
		}

		const pixelData = new Uint8Array(4);
		gl.readPixels(canvasX, canvasY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelData);

		return pixelData[3] === 0;
	}

	private sendSupportUnreadCount(data: any): void {
		window.localStorage.setItem('hsCurrentUnreadCount', data.unreadCount);
		window.postMessage({
			name: 'common.support_unread_count',
			data: { unreadCount: data.unreadCount }
		}, window.origin)
	}

	private launchDepositCompliance({ price }: any) {
		sessionStorage.setItem(KYC_DEPOSIT_COMPLIANCE_PRICE_AMOUNT, price);
		window.postMessage({
			name: 'kyc.open_form_modal',
			tier: 'deposit'
		});
	}

	/**
	 * Central entry point for all server events.
	 *
	 * The server always sends its events wrapped into a generic envelope. This envelope
	 * is received here as `data`, which is expected to contain:
	 * - `name`: the actual event name (string)
	 * - `data`: the event payload (any)
	 *
	 * All server events will come through this handler. Re-emits the event in a
	 * normalized format through `window.postMessage`. This makes sure the rest
	 * of the application can listen to server events in a unified way,
	 * without being aware of the server-specific envelope.
	 *
	 * @param data - The raw server event envelope, containing `name` and `data`.
	 */
	private handleServerEvent(data: any): void {
		const { name: internalEventName, data: internalEventData } = data;
		if (!internalEventName) {
			console.error('Unable to handle server event. Internal event name is missing.');
			return
		}
		let parsedData: any = null;
		if (internalEventData) {
			try {
				parsedData = JSON.parse(internalEventData);
			} catch (err) {
				console.error('Failed to parse server event data:', internalEventData, err);
			}
		} else {
			console.warn('Server event has no data payload:', internalEventName);
		}
		window.postMessage({
			name: internalEventName,
			data: parsedData
		}, window.origin)
	}
}
