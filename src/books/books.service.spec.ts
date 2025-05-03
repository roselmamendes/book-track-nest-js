import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { NotionClient } from '../clients/notion';
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

describe('BookService', () => {
    let bookService:BooksService;
    let notionClient:NotionClient;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            return "key-test";
                        })
                    }
                },
                NotionClient
            ],
        }).compile();
        bookService = app.get < BooksService > (BooksService);
        notionClient = app.get<NotionClient> (NotionClient);
    });

    it('should call notion client to get all books', async () => {
        const notionDBReturn = buildNotionResponse();
        jest.spyOn(notionClient, 'getNotionBookshelfDatabase').mockResolvedValue(notionDBReturn);
        const result = await bookService.findAllFromNotion();

        expect(notionClient.getNotionBookshelfDatabase).toHaveBeenCalledWith();
        expect(result).toEqual([{
            title: 'Titulo do Livro',
            author: '',
            genre: ''
        }]);
    });

    function buildNotionResponse() {
        const bookFromNotion = {
            properties: {
                Genre: {
                    id: "QujG",
                    type: "relation",
                    relation: [],
                    has_more: false
                },
                Author: {
                    id: "author-id",
                    type: "relation",
                    relation: [],
                    has_more: false
                },
                Title: {
                    id: "title",
                    type: "title",
                    title: [
                        {
                            plain_text: 'Titulo do Livro'
                        }
                    ]
                }
            } 
        }as any;
        
        return {
            results: [bookFromNotion],
            type: 'page_or_database',
            page_or_database: {},
            object: 'list',
            next_cursor: null,
            has_more: false
        } as QueryDatabaseResponse;
    }
});