import { MaximizeIcon, MinimizeIcon } from "lucide-react";

import SimpleTooltip from "@/components/tooltip/simple-tooltip";
import { useVis } from "../vis-context";

interface IFullScreenButtonProps {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FullScreenButton({
  fullScreen,
  setFullScreen,
}: IFullScreenButtonProps) {
  const { containerRef } = useVis();

  const enterFullscreen = () => {
    const elem = containerRef?.current;
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  return (
    <SimpleTooltip content="Toggle Fullscreen">
      <button
        className="cursor-pointer"
        onClick={() => {
          setFullScreen(!fullScreen);
          handleFullscreen();
        }}
      >
        {fullScreen ? (
          <MinimizeIcon className="fill-neutral-700 stroke-neutral-700 w-6 h-6" />
        ) : (
          <MaximizeIcon className="fill-neutral-700 stroke-neutral-700 w-6 h-6" />
        )}
      </button>
    </SimpleTooltip>
  );
}
