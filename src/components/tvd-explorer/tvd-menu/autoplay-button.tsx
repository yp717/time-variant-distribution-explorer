"use client";

import SimpleTooltip from "@/components/tooltip/simple-tooltip";
import { Pause, PlayIcon } from "lucide-react";

interface IAutoPlayButtonProps {
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AutoPlayButton({
  autoPlay,
  setAutoPlay,
}: IAutoPlayButtonProps) {
  return (
    <SimpleTooltip content={autoPlay ? "Autoplay is on" : "Autoplay is off"}>
      <div
        role="switch"
        aria-checked={autoPlay}
        className="relative inline-flex items-center h-3 w-8 cursor-pointer rounded-full border-2 border-gray-300 transition-colors duration-200 ease-in-out bg-gray-200"
        onClick={() => setAutoPlay(!autoPlay)}
      >
        <span
          className={`absolute -left-3 -top-1.5 h-5 w-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
            autoPlay ? "translate-x-8" : ""
          }`}
        >
          {autoPlay ? (
            <PlayIcon
              className="w-3 h-3 text-neutral-600"
              fill="currentColor"
            />
          ) : (
            <Pause className="w-3 h-3 text-neutral-600" fill="currentColor" />
          )}
        </span>
      </div>
    </SimpleTooltip>
  );
}
