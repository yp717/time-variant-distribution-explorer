import * as React from "react";

export function useKeyPress(callback: () => void, keyCodes: string[]): void {
  const handler = ({ code }: KeyboardEvent) => {
    if (keyCodes.includes(code)) {
      callback();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [keyCodes]);
}
