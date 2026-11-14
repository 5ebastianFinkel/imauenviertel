// Helpers for the content collections (see content-collections.ts). They take
// the documents as arguments, so they work without the generated content.

// Events store their day as YYYY-MM-DD. Parse it as local time, not UTC.
export function parseLocalDate(day: string): Date {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year, month - 1, date);
}

// Events are local midnight, so compare against the start of today to keep
// today's events listed.
export function getUpcomingEvents<T extends { draft: boolean; date: string }>(
  events: readonly T[],
  limit?: number,
  now = new Date(),
): T[] {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sorted = events
    .filter((event) => !event.draft && parseLocalDate(event.date) >= startOfToday)
    .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime());
  return limit === undefined ? sorted : sorted.slice(0, limit);
}

// Entries with 'draft: false' and a publish date before now
export function getPublished<T extends { draft: boolean; publishDate: string }>(
  entries: readonly T[],
  now = new Date(),
): T[] {
  return entries.filter((entry) => !entry.draft && new Date(entry.publishDate) < now);
}

export function sortByOrder<T extends { order: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function formatTime({ startTime, endTime }: { startTime?: string; endTime?: string }): string {
  if (!startTime) return "Ganztägig";
  return endTime ? `${startTime}–${endTime} Uhr` : `${startTime} Uhr`;
}

export const day = (date: Date) => date.toLocaleDateString("de-DE", { day: "2-digit" });
export const monthShort = (date: Date) =>
  date.toLocaleDateString("de-DE", { month: "short" }).replace(".", "");
export const weekday = (date: Date) => date.toLocaleDateString("de-DE", { weekday: "long" });

// Publish dates are stored as UTC timestamps; format them in UTC so the
// prerendered HTML and the browser agree on the day.
export const formatPublishDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("de", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
