import SimpleTooltip from "@/components/tooltip/simple-tooltip";
import { useKeyPress } from "@/hooks/useKeyboardShortcut";
import { Pause, PlayIcon } from "lucide-react";

interface IPlayButtonProps {
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: props on these component should be extendible and type safe
export default function PlayButton({ paused, setPaused }: IPlayButtonProps) {
  useKeyPress(() => setPaused(!paused), ["KeyK"]);

  return (
    <SimpleTooltip content="Play">
      <button className="cursor-pointer" onClick={() => setPaused(!paused)}>
        {paused ? (
          <PlayIcon className="fill-neutral-400 dark:fill-neutral-600 stroke-neutral-400 dark:stroke-neutral-600 hover:fill-neutral-400 dark:hover:fill-neutral-200 hover:stroke-neutral-400 dark:hover:stroke-neutral-200 w-6 h-6 transition duration-150 ease-out" />
        ) : (
          <Pause className="fill-neutral-400 dark:fill-neutral-600 stroke-neutral-400 dark:stroke-neutral-600 hover:fill-neutral-400 dark:hover:fill-neutral-200 hover:stroke-neutral-400 dark:hover:stroke-neutral-200 w-6 h-6 transition duration-150 ease-out" />
        )}
      </button>
    </SimpleTooltip>
  );
}
