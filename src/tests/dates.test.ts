import { describe, expect, it } from 'vitest';
import { getCollection, type CollectionEntry } from 'astro:content';

describe('Date Collection', () => {
  it('should load date entries with correct structure', async () => {
    const dates = await getCollection('dates');
    expect(dates).toBeDefined();
    expect(dates.length).toBeGreaterThan(0);
    
    // Check first entry has correct structure
    const firstDate = dates[0];
    expect(firstDate.data).toHaveProperty('title');
    expect(firstDate.data).toHaveProperty('date');
    expect(firstDate.data).toHaveProperty('draft');
    expect(firstDate.data.date).toBeInstanceOf(Date);
  });

  it('should have valid date objects', async () => {
    const dates = await getCollection('dates');
    
    for (const date of dates) {
      expect(date.data.date).toBeInstanceOf(Date);
      expect(date.data.date.toString()).not.toBe('Invalid Date');
      expect(typeof date.data.title).toBe('string');
      expect(typeof date.data.draft).toBe('boolean');
    }
  });

  it('should filter by draft status', async () => {
    const publishedDates = await getCollection('dates', ({ data }: CollectionEntry<'dates'>) => !data.draft);
    expect(publishedDates).toBeDefined();
    
    // All returned dates should be non-draft
    publishedDates.forEach((date: CollectionEntry<'dates'>) => {
      expect(date.data.draft).toBe(false);
    });
  });
});
