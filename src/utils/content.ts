// Collection helpers shared by the start page, dates and documents pages
import { getCollection } from 'astro:content';

export async function getUpcomingEvents(limit?: number, now = new Date()) {
  const events = await getCollection('events', ({ data }) => !data.draft && data.date > now);
  const sorted = events.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  return limit === undefined ? sorted : sorted.slice(0, limit);
}

export async function getSortedDocuments() {
  const documents = await getCollection('documents');
  return documents.sort((a, b) => a.data.order - b.data.order);
}

export async function getSortedLinks() {
  const links = await getCollection('links');
  return links.sort((a, b) => a.data.order - b.data.order);
}

export function formatTime({ startTime, endTime }: { startTime?: string; endTime?: string }): string {
  if (!startTime) return 'Ganztägig';
  return endTime ? `${startTime}–${endTime} Uhr` : `${startTime} Uhr`;
}

export const day = (date: Date) => date.toLocaleDateString('de-DE', { day: '2-digit' });
export const monthShort = (date: Date) =>
  date.toLocaleDateString('de-DE', { month: 'short' }).replace('.', '');
export const weekday = (date: Date) => date.toLocaleDateString('de-DE', { weekday: 'long' });
