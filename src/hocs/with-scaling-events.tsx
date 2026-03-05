/* eslint-disable react-hooks/exhaustive-deps */
import { UIEvents } from '@/enum/ui';
import React, { ComponentType, useEffect, useState } from 'react';
import { floorToTwoDecimals } from '@/lib/utils';

const withScalingEvents = <P extends object>(
	Component: ComponentType<P>
): ComponentType<P> => {

	return function ComponentWithScalingEvents(props: P) {
		const [paddingTop, setPaddingTop] = useState(window.lobbyTopPanelSize ?? 0);
		const [paddingRight, setPaddingRight] = useState(window.lobbySidePanelSize ?? 0);
		
		const handleScaleEvent = (evt: MessageEvent) => {
			const { name, data } = evt.data;
			if (UIEvents.TopPanelSizeChange === name) {
				const { height } = data;
				setPaddingTop(floorToTwoDecimals(height / window.devicePixelRatio));
			}
			if (UIEvents.SidePanelSizeChange === name) {
				const { width } = data;
				setPaddingRight(floorToTwoDecimals(width / window.devicePixelRatio));
			}
		};

		useEffect(() => {
			window.addEventListener('message', handleScaleEvent);
			return () => {
				window.removeEventListener('message', handleScaleEvent);
			}
		}, []);

		return <Component {...props as P} paddingTop={paddingTop} paddingRight={paddingRight} />;
	}
}

export default withScalingEvents;
