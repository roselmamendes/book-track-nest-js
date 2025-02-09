import { Injectable } from '@nestjs/common';
import { getNotionBookshelfDatabase } from '../clients/notion'
import { ConfigService } from '@nestjs/config';
import { buildBooksListFromNotion , Book} from './books';

@Injectable()
export class BooksService {
  
constructor(private configService: ConfigService) {}

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
    const notionPageId = this.configService.get<string>('NOTION_PAGE_ID');
    const notionKey = this.configService.get<string>('NOTION_KEY');
    
    let notionBookshelfDatabase = await getNotionBookshelfDatabase(notionKey, notionPageId);
    let resultToShow = buildBooksListFromNotion(notionBookshelfDatabase.results);
    return resultToShow;
  }
}
