import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format date and time in the format: 12th May, 10:00 PM
// export function formatDateTime(date: Date): string {
//   const day = date.getDate();
//   const ordinal =
//     day % 10 === 1 && day !== 11
//       ? "st"
//       : day % 10 === 2 && day !== 12
//       ? "nd"
//       : day % 10 === 3 && day !== 13
//       ? "rd"
//       : "th";

//   const formattedDate = new Intl.DateTimeFormat("en-GB", {
//     month: "short",
//   }).format(date);

//   const time = new Intl.DateTimeFormat("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   }).format(date);

//   return `${day}${ordinal} ${formattedDate}, ${time}`;
// }
