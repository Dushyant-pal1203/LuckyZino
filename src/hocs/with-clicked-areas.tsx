/* eslint-disable react-hooks/exhaustive-deps */
import { UIEvents } from '@/enum/ui';
import { useMap } from '@/hooks/useMap';
import { floorToTwoDecimals, isProdEnv } from '@/lib/utils';
import clsx from 'clsx';
import React, { ComponentType, useEffect } from 'react';

function canvasToHtmlCoordinates(
  canvas: HTMLCanvasElement,
  canvasRect: IClickableRect
) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: -(
      rect.width -
      canvasRect.x / window.devicePixelRatio -
      canvasRect.width / 2 / window.devicePixelRatio
    ),
    y:
      rect.height -
      canvasRect.y / window.devicePixelRatio -
      canvasRect.height / 2 / window.devicePixelRatio
  };
}

interface IClickableRect {
  height: number;
  width: number;
  x: number;
  y: number;
  id?: string;
}

export interface IEventData {
  id: number;
  rect: IClickableRect;
}

const ReactiveItem = ({
  canvasRect,
  lobbyCanvas
}: {
  canvasRect: IClickableRect;
  lobbyCanvas: HTMLCanvasElement;
}) => {
  const coords = canvasToHtmlCoordinates(lobbyCanvas, canvasRect);
  const size = {
    width: floorToTwoDecimals(canvasRect.width / window.devicePixelRatio),
    height: floorToTwoDecimals(canvasRect.height / window.devicePixelRatio)
  };
  const className = clsx(
    'absolute top-0 right-0 z-[551] pointer-events-all',
    !isProdEnv() && 'border border-red-600 text-center text-gray-300'
  );
  return (
    <div
      className={className}
      onClick={() => {
        window.postMessage(
          { name: UIEvents.ClickableRectClicked, data: { id: canvasRect.id } },
          '*'
        );
      }}
      style={{
        width: size.width,
        height: size.height,
        transform: `translate(${coords.x}px, ${coords.y}px)`,
        userSelect: 'none'
      }}
    >
      {!isProdEnv() && 'DEBUG'}
    </div>
  );
};

const withClickedAreas = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P> => {
  return function ComponentWithClickedAreas(props: P) {
    const { lobbyCanvas } = props as any;
    const areasMap = useMap([]);

    const handleScaleEvent = (evt: MessageEvent) => {
      const { name, data } = evt.data;
      const rectData: IEventData = data;

      if (name === UIEvents.AddClickedArea) {
        areasMap.set(rectData.id, { ...rectData.rect, id: rectData.id });
      }
      if (name === UIEvents.RemoveClickedArea) {
        areasMap.delete(rectData.id);
      }
      if (name === UIEvents.ClearClickableRects) {
        areasMap.clear();
      }
    };

    useEffect(() => {
      window.addEventListener('message', handleScaleEvent);
      if (
        (window as any).__clickableRects &&
        (window as any).__clickableRects.length
      ) {
        (window as any).__clickableRects.forEach((rect: IEventData) =>
          areasMap.set(rect.id, { ...rect.rect, id: rect.id })
        );
      }
      return () => {
        (window as any).__clickableRects = [];
        window.removeEventListener('message', handleScaleEvent);
      };
    }, []);

    const reactiveItems = Array.from(areasMap.values()) as IClickableRect[];

    return (
      <>
        <Component {...(props as P)}></Component>
        {reactiveItems.map((rect) => (
          <ReactiveItem
            key={rect.id ?? 'rect'}
            canvasRect={rect}
            lobbyCanvas={lobbyCanvas}
          ></ReactiveItem>
        ))}
      </>
    );
  };
};

export default withClickedAreas;
