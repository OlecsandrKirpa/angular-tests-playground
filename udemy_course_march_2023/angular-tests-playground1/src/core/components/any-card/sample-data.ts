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
  }
];