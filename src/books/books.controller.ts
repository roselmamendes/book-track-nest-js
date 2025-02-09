import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): any[] {
    return this.booksService.findAll();
  }

  @Get('notion')
  async findAllFromNotion(): Promise<any[]> {
    return this.booksService.findAllFromNotion();
  }
}