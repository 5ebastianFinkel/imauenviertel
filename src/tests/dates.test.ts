import { describe, expect, it } from 'vitest';
import { getCollection, type CollectionEntry } from 'astro:content';

describe('Events Collection', () => {
  it('should load event entries with correct structure', async () => {
    const events = await getCollection('events');
    expect(events).toBeDefined();
    expect(events.length).toBeGreaterThan(0);
    
    // Check first entry has correct structure
    const firstEvent = events[0];
    expect(firstEvent.data).toHaveProperty('title');
    expect(firstEvent.data).toHaveProperty('date');
    expect(firstEvent.data).toHaveProperty('draft');
    expect(firstEvent.data.date).toBeInstanceOf(Date);
  });

  it('should have valid date objects', async () => {
    const events = await getCollection('events');
    
    for (const event of events) {
      expect(event.data.date).toBeInstanceOf(Date);
      expect(event.data.date.toString()).not.toBe('Invalid Date');
      expect(typeof event.data.title).toBe('string');
      expect(typeof event.data.draft).toBe('boolean');
    }
  });

  it('should filter by draft status', async () => {
    const publishedEvents = await getCollection('events', ({ data }: CollectionEntry<'events'>) => !data.draft);
    expect(publishedEvents).toBeDefined();
    
    // All returned events should be non-draft
    publishedEvents.forEach((event: CollectionEntry<'events'>) => {
      expect(event.data.draft).toBe(false);
    });
  });
});
