// Mock implementation of astro:content for testing
export async function getCollection(collectionName: string, filter?: (entry: any) => boolean) {
  const mockData = [
    {
      id: 'test-event-1',
      data: {
        title: 'Test Event 1',
        date: new Date('2025-06-15'),
        description: 'Test description',
        draft: false,
      },
    },
    {
      id: 'test-event-2', 
      data: {
        title: 'Test Event 2',
        date: new Date('2025-07-20'),
        description: 'Another test description',
        draft: false,
      },
    },
    {
      id: 'test-event-3', 
      data: {
        title: 'Draft Event',
        date: new Date('2025-08-10'),
        description: 'This is a draft',
        draft: true,
      },
    },
  ];

  if (filter) {
    return mockData.filter(filter);
  }
  
  return mockData;
}