import { differenceInDays } from "date-fns";

export function daysUntil(date: Date): number {
  const today = new Date();
  return differenceInDays(date, today);
}
