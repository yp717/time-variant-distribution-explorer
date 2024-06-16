import SimpleTooltip from "@/components/tooltip/simple-tooltip";
import { Pause, PlayIcon } from "lucide-react";

interface IPlayButtonProps {
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: props on these component should be extendible and type safe
export default function PlayButton({ paused, setPaused }: IPlayButtonProps) {
  return (
    <SimpleTooltip content="Play">
      <button className="cursor-pointer" onClick={() => setPaused(!paused)}>
        {paused ? (
          <PlayIcon className="fill-neutral-700 stroke-neutral-700 w-6 h-6" />
        ) : (
          <Pause className="fill-neutral-700 stroke-neutral-700 w-6 h-6" />
        )}
      </button>
    </SimpleTooltip>
  );
}
