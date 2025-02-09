import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksController = app.get<BooksController>(BooksController);
  });

  describe('Books', () => {
    it('should return all Books saved', () => {
      expect(booksController.findAll()).toEqual([
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
      ]);
    });

    it('should return all Books saved from Notion', () => {
      expect(booksController.findAllFromNotion()).toEqual([
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
      ]);
    });
  });
});
