import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn is a utility function that combines clsx and tailwind-merge
 * @param inputs - The inputs to be passed to clsx
 * @returns The merged classnames
 */
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default cn;
