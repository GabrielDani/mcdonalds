import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};
