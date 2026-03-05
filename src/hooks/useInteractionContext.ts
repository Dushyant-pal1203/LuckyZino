import { useState, useEffect } from 'react';

const useInteractionContext = () => {
	const [isPointerEventsEnabled, setPointerEventsEnabled] = useState(true);

	useEffect(() => {
		const onContextChange = (evt: MessageEvent) => {
			const {name, data} = evt.data;
			if('ui.change_interaction_context' !== name) return;
			setPointerEventsEnabled(data?.context === 'slot');
		}
		window.addEventListener('message', onContextChange);
		return () => window.removeEventListener('message', onContextChange);
	}, []);
	return { isPointerEventsEnabled };
}

export default useInteractionContext;