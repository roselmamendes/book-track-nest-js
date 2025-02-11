import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ConfigService } from '@nestjs/config';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              return "key-test";
            })
          }
        }
      ],
    }).compile();
    booksService = app.get<BooksService>(BooksService);
  
    booksController = app.get<BooksController>(BooksController);
  });

  describe('Books', () => {
    const expectedAllBooks = [
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
    ]; 

    it('should return all Books saved', () => {
      expect(booksController.findAll()).toEqual(expectedAllBooks);
    });

    it('should return all Books saved from Notion', async () => {
      jest.spyOn(booksService, 'findAllFromNotion').mockResolvedValue(expectedAllBooks);
      const actual = await booksController.findAllFromNotion();
  
      expect(actual).toEqual(expectedAllBooks);
    });
  });
});
