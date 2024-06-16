"use client";

import * as React from "react";

import ResizeObserver from "resize-observer-polyfill";

interface DOMRectReadOnly {
  readonly bottom: number;
  readonly height: number;
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

const IS_BROWSER = typeof window !== "undefined";

/**
 * Re-usable hook to watch for the resizing of a React component or Element.
 * @param hookProperties - Configuration options for the hook.
 * @returns The `DOMRect` for the observed element.
 */
export const useResizeObserver = (
  ref?: React.RefObject<Element> | null,
  element?: Element | null | undefined,
  callback?: (entry?: ResizeObserverEntry) => void
): DOMRect => {
  const [sizes, setSizes] = React.useState<DOMRectReadOnly>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const handleResize = (entries: ResizeObserverEntry[]) => {
    const [entry] = entries;

    if (callback) callback(entry);

    setSizes(entry.contentRect);
  };

  const [resizeObs] = React.useState(() =>
    IS_BROWSER ? new ResizeObserver(handleResize) : undefined
  );

  React.useEffect(() => {
    if (!resizeObs) return;
    let domNode;

    if (ref) domNode = ref.current;
    else if (element) domNode = element;

    if (domNode) resizeObs.observe(domNode);

    return () => resizeObs.disconnect();
  }, [ref, resizeObs, element]);

  return sizes as DOMRect;
};
