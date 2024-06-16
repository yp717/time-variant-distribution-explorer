import * as React from "react";

import * as d3 from "d3";
import { useResizeObserver } from "@/hooks/useResizeObserver";

type VisContextProps = {
  svgRef: React.RefObject<SVGSVGElement> | null;
  containerRef: React.RefObject<HTMLDivElement> | null;
  containerDimensions: DOMRectReadOnly;
  svgDimensions: DOMRectReadOnly;
};

interface IVisContextProviderProps {
  svgRef?: React.RefObject<SVGSVGElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

const VisContext = React.createContext<Partial<VisContextProps>>({
  svgRef: null,
  containerRef: null,
});

function VisProvider({
  svgRef,
  containerRef,
  children,
}: IVisContextProviderProps) {
  const containerDimensions = useResizeObserver(containerRef);
  const svgDimensions = useResizeObserver(svgRef);

  // Check if the children is a ReactElement and its type is 'svg'
  if (!React.isValidElement(children) || children.type !== "svg") {
    throw new Error(
      "The immediate child of VisProvider should always be an SVG element."
    );
  }

  if (!svgRef || !containerRef || !svgDimensions || !containerDimensions)
    return null;

  return (
    <VisContext.Provider
      value={{
        svgRef: svgRef,
        containerRef: containerRef,
        containerDimensions: containerDimensions,
        svgDimensions: svgDimensions,
      }}
    >
      {children}
    </VisContext.Provider>
  );
}

/**
 * Hook that provides access to vis-context
 * @returns VisContext
 */
const useVis = () => {
  const context = React.useContext(VisContext);

  if (!context) {
    throw new Error("useVisContext must be used within a VisProvider");
  }

  return context;
};

export { VisProvider, useVis };
