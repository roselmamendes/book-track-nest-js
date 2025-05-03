import { Injectable } from '@nestjs/common';
import { buildBooksListFromNotion, Book } from './books';
import { NotionClient } from '../clients/notion';

@Injectable()
export class BooksService {
  
constructor(
  private notionClient: NotionClient,
) {}

  books: any[] = [
      {
          title: "Quinta Estação",
          author: "N. K. Jemisin",
          genre: "Scifi"
      },
      {
          title: "O Jogo do Anjo",
          author: "Carlos Ruiz Záfon",
          genre: "Mistério"
      }
  ]

  findAll(): any[] {
    return this.books;
  }

  async findAllFromNotion(): Promise<Book[]>{
    const notionBookshelfDatabase = await this.notionClient.getNotionBookshelfDatabase();
    const resultToShow = buildBooksListFromNotion(notionBookshelfDatabase.results);
    return resultToShow;
  }
}
