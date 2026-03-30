import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}
