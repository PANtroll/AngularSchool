export interface Book{
  id: number;
  img: string;
  title:string;
  author: string;
  publisher: string;
  category: string;
  date: string;
  isbn: string;
  description: string;
  status: string;
}

export type NewBook = Omit<Book, "id">;