// Data helpers for the start page redesign mockups (/redesign/*)
import { getCollection, type CollectionEntry } from 'astro:content';

export interface HomeEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  description?: string;
}

export interface HomeEvents {
  events: HomeEvent[];
  // true when no upcoming events exist and sample dates are shown instead
  isSample: boolean;
}

function toHomeEvent(entry: CollectionEntry<'events'>, date = entry.data.date): HomeEvent {
  return {
    id: entry.id,
    title: entry.data.title,
    date,
    startTime: entry.data.startTime,
    endTime: entry.data.endTime,
    description: entry.data.description,
  };
}

// Returns the next upcoming events. If the collection has none (e.g. last
// season's dates were never updated), the yearly events are projected onto
// their next occurrence so the mockups can still be judged with content.
export async function getHomeEvents(limit = 4, now = new Date()): Promise<HomeEvents> {
  const entries = await getCollection('events', ({ data }) => !data.draft);

  const upcoming = entries
    .filter((entry) => entry.data.date > now)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());

  if (upcoming.length > 0) {
    return { events: upcoming.slice(0, limit).map((entry) => toHomeEvent(entry)), isSample: false };
  }

  const projected = entries
    .map((entry) => {
      const { date } = entry.data;
      const next = new Date(now.getFullYear(), date.getMonth(), date.getDate());
      if (next <= now) next.setFullYear(next.getFullYear() + 1);
      return toHomeEvent(entry, next);
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return { events: projected.slice(0, limit), isSample: true };
}

export async function getHomeDocuments(limit = 4) {
  const documents = await getCollection('documents');
  return documents.sort((a, b) => a.data.order - b.data.order).slice(0, limit);
}

export async function getHomeLinks(limit = 4) {
  const links = await getCollection('links');
  return links.sort((a, b) => a.data.order - b.data.order).slice(0, limit);
}

export function formatTime(event: HomeEvent): string {
  if (!event.startTime) return 'Ganztägig';
  return event.endTime ? `${event.startTime}–${event.endTime} Uhr` : `${event.startTime} Uhr`;
}

export const day = (date: Date) => date.toLocaleDateString('de-DE', { day: '2-digit' });
export const monthShort = (date: Date) =>
  date.toLocaleDateString('de-DE', { month: 'short' }).replace('.', '');
export const monthLong = (date: Date) => date.toLocaleDateString('de-DE', { month: 'long' });
export const weekday = (date: Date) => date.toLocaleDateString('de-DE', { weekday: 'long' });
