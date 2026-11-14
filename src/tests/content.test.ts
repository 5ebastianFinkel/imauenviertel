import { describe, expect, it } from 'vitest';
import {
  formatPublishDate,
  formatTime,
  getPublished,
  getUpcomingEvents,
  parseLocalDate,
  sortByOrder,
} from '../utils/content';

const events = [
  { title: 'Later', date: '2025-07-20', draft: false },
  { title: 'Draft', date: '2025-08-10', draft: true },
  { title: 'Today', date: '2025-06-15', draft: false },
  { title: 'Past', date: '2025-06-14', draft: false },
  { title: 'Next year', date: '2026-04-18', draft: false },
];

describe('parseLocalDate', () => {
  it('should parse the day as local midnight', () => {
    const date = parseLocalDate('2025-06-15');
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(15);
    expect(date.getHours()).toBe(0);
  });
});

describe('getUpcomingEvents', () => {
  const now = new Date(2025, 5, 15, 18, 30); // June 15, 2025, in the evening

  it('should drop drafts and past events but keep events of today', () => {
    const upcoming = getUpcomingEvents(events, undefined, now);
    expect(upcoming.map((event) => event.title)).toEqual(['Today', 'Later', 'Next year']);
  });

  it('should sort by date and respect the limit', () => {
    const upcoming = getUpcomingEvents(events, 2, now);
    expect(upcoming.map((event) => event.title)).toEqual(['Today', 'Later']);
  });

  it('should not modify the collection', () => {
    const before = events.map((event) => event.title);
    getUpcomingEvents(events, undefined, now);
    expect(events.map((event) => event.title)).toEqual(before);
  });
});

describe('getPublished', () => {
  const now = new Date('2025-06-15T12:00:00Z');
  const entries = [
    { id: 'published', draft: false, publishDate: '2025-05-14T00:00:00.000Z' },
    { id: 'draft', draft: true, publishDate: '2025-05-14T00:00:00.000Z' },
    { id: 'scheduled', draft: false, publishDate: '2025-07-01T00:00:00.000Z' },
  ];

  it('should only return non-draft entries with a publish date in the past', () => {
    expect(getPublished(entries, now).map((entry) => entry.id)).toEqual(['published']);
  });
});

describe('sortByOrder', () => {
  it('should sort ascending without modifying the input', () => {
    const items = [{ order: 3 }, { order: 1 }, { order: 2 }];
    expect(sortByOrder(items).map((item) => item.order)).toEqual([1, 2, 3]);
    expect(items[0].order).toBe(3);
  });
});

describe('formatting', () => {
  it('should format event times', () => {
    expect(formatTime({})).toBe('Ganztägig');
    expect(formatTime({ startTime: '10:00' })).toBe('10:00 Uhr');
    expect(formatTime({ startTime: '10:00', endTime: '13:00' })).toBe('10:00–13:00 Uhr');
  });

  it('should format publish dates independent of the local time zone', () => {
    expect(formatPublishDate('2025-10-28T00:00:00.000Z')).toBe('28. Oktober 2025');
  });
});
