export type CardData = {
  title?: string;
  description?: string;
  imageUrl?: string;
  notes?: string;
};

export const AnyCardSampleData: CardData[] = [
  {
    title: 'Title 1',
    description: 'Description 1',
    imageUrl: 'https://picsum.photos/200/300',
    notes: 'Notes 1'
  },
  {
    title: 'Title 2',
    description: 'Description 2',
    imageUrl: 'https://picsum.photos/200/300',
    notes: 'Notes 2'
  }
];