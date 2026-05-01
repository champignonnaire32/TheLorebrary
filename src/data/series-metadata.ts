export interface SeriesMetadata {
  author: string;
  genre: 'Fantasy' | 'Science Fiction';
}

export const seriesMetadata: Record<string, SeriesMetadata> = {
  'Dune': {
    author: 'Frank Herbert',
    genre: 'Science Fiction',
  },
  'Harry Potter': {
    author: 'J.K. Rowling',
    genre: 'Fantasy',
  },
  'Red Rising': {
    author: 'Pierce Brown',
    genre: 'Science Fiction',
  },
  'The Lord of the Rings': {
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
  },
  'The Stormlight Archive': {
    author: 'Brandon Sanderson',
    genre: 'Fantasy',
  },
  'The Suneater Series': {
    author: 'Christopher Ruocchio',
    genre: 'Science Fiction',
  },
};
