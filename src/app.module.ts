import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { ConfigModule } from '@nestjs/config';
import { NotionClient } from './clients/notion';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService, NotionClient],
})
export class AppModule {}
