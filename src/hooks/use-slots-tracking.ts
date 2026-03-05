import { SLOTS_WITHOUT_EVENTS } from "@/constants/game";
import { TrackerEvents } from "@/enum/trackers";
import { sendBIEvent } from "@/lib/trackers";
import { SlotData } from "@/types/slot";

export const useSlotsTracking = () => {
	let slotDataProps:SlotData|null = null;
	let isInited = false;
	let prevCache:string|null = null;
	const listenSlot = (evt: MessageEvent) => {
		const slot = {
			inilization_finish_event: true,
			id: slotDataProps?.slotId,
			owner: slotDataProps?.slotOwner
		}
		const { data } = evt;
		let evtData = data;
		try {
			if (typeof data === 'string') {
				evtData = JSON.parse(data);
			}
		} catch (e) {
			console.warn(e);
		}

		if(JSON.stringify(evtData) === prevCache) return;
		
		prevCache = JSON.stringify(evtData);
		const { action, event, payload, type, data: slotData, name } = evtData;
		if(SLOTS_WITHOUT_EVENTS.includes(slot.id!)) {
			slot.inilization_finish_event = false;
		}
		if(name) {
			if(name.includes('loaded')) {
				sendBIEvent(TrackerEvents.SlotLoadingFinished, { slot });
			}
			if(name.includes('error')) {
				sendBIEvent(TrackerEvents.SlotError, { slot, error_message: payload?.errorMessage ?? JSON.stringify(slotData) ?? "" });
			}
		}

		if (action) {
			if (action.toLowerCase().includes('init') || action === 'aleaplay.start') {
				sendBIEvent(TrackerEvents.SlotLoadingFinished, { slot });
			}
			if (action.toLowerCase().includes('error')) {
				sendBIEvent(TrackerEvents.SlotError, { slot, error_message: payload?.errorMessage ?? JSON.stringify(slotData) ?? "" });
			}
		}
		if (event) {
			if (event === 'gameLoadingEnded' || event === 'gameLoaded') {
				sendBIEvent(TrackerEvents.SlotLoadingFinished, {slot});
			}
			if (event.toLowerCase().includes('error')) {
				sendBIEvent(TrackerEvents.SlotError, { slot, error_message: payload?.errorMessage ?? JSON.stringify(slotData) ?? "" });
			}
		}

		if (type) {
			if (type.toLowerCase().includes('loaded') || type.toLowerCase().includes('init') || type.toLowerCase().includes('completed')) {
				sendBIEvent(TrackerEvents.SlotLoadingFinished, {slot});
			}
			if (type.toLowerCase().includes('error')) {
				sendBIEvent(TrackerEvents.SlotError, { slot, error_message: payload?.errorMessage ?? JSON.stringify(slotData) ?? "" });
			}
		}
	};

	const subscribe = (el: HTMLIFrameElement | HTMLCanvasElement, slot: SlotData) => {
		slotDataProps = slot;
		if(!isInited) {
			sendBIEvent(TrackerEvents.SlotLoadingStarted, {
				slot: {
					inilization_finish_event: true,
					id: slot.slotId,
					owner: slot.slotOwner
				}
			});
		};
		if (el instanceof HTMLIFrameElement) {
			el.contentWindow?.addEventListener('message', listenSlot);
		}
		window.addEventListener('message', listenSlot)
		isInited = true;
	};
	const unsubscribe = () => window.removeEventListener('message', listenSlot);
	return { subscribe, unsubscribe }
}