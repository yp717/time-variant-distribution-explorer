import { MaximizeIcon, MinimizeIcon } from "lucide-react";

import SimpleTooltip from "@/components/tooltip/simple-tooltip";

interface IFullScreenButtonProps {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FullScreenButton({
  fullScreen,
  setFullScreen,
}: IFullScreenButtonProps) {
  return (
    <SimpleTooltip content="Toggle Fullscreen">
      <button
        className="cursor-pointer"
        onClick={() => setFullScreen(!fullScreen)}
      >
        {fullScreen ? (
          <MaximizeIcon className="fill-neutral-700 stroke-neutral-700 w-6 h-6" />
        ) : (
          <MinimizeIcon className="fill-neutral-700 stroke-neutral-700 w-6 h-6" />
        )}
      </button>
    </SimpleTooltip>
  );
}
