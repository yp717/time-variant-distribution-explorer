"use client";

import * as React from "react";

import PlayButton from "./play-button";
import FullScreenButton from "./fullscreen-button";
import AutoPlayButton from "./autoplay-button";

interface ITVDMenuProps {
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  currentYear: number;
}

export default function TVDMenu({
  paused,
  setPaused,
  currentYear,
}: ITVDMenuProps) {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);

  return (
    <div className="p-2 w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
      {/* TODO: turn each of the controls in the menu into a component */}
      <div className="flex gap-4 items-center justify-center">
        <PlayButton paused={paused} setPaused={setPaused} />
        <p className="font-light text-sm text-neutral-800 dark:text-neutral-100">{`${currentYear} / ${2019}`}</p>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <AutoPlayButton autoPlay={autoPlay} setAutoPlay={setAutoPlay} />
        <FullScreenButton
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      </div>
    </div>
  );
}
