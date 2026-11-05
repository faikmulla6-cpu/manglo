import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conventional shadcn class-name helper for future UI components. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
