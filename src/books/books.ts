export interface Book {
    title: string;
    author: string;
    genre: string;
  }

export function buildBooksListFromNotion(allBooksFromNotion: any[]): Book[] {
    let allBooks: Book[];
    allBooks = allBooksFromNotion.map((bookFromNotion) => {
        let book: Book = {
            title: bookFromNotion.properties.Title.title[0].plain_text,
            author: '',
            genre: ''
        };
        return book;
    });
    return allBooks;
}