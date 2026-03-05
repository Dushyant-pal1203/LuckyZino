/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 16/12/2024 23:54
 */

export interface ISlotData {
  url: string;
  loadType: 'unity_canvas' | 'iframe';
	slotId: string;
	slotOwner: string;
}

export interface IframeSlotData extends ISlotData {
  loadType: 'iframe';
}

export interface UnitySlotData extends ISlotData {
  loadType: 'unity_canvas';
  accessToken: string;
}

export type SlotData = IframeSlotData | UnitySlotData;
