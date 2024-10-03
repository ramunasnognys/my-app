import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names intelligently using `clsx` and `tailwind-merge`.
 * This ensures that Tailwind classes are properly merged to avoid conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
