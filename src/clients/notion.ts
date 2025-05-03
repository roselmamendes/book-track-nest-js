import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

@Injectable()
export class NotionClient {
    private readonly notionClient: Client;

    constructor(private configService: ConfigService,) {
        this.notionClient = new Client({ auth: process.env.NOTION_KEY });
    }
    
    async getNotionBookshelfDatabase(): Promise<QueryDatabaseResponse> {
        const notionPageId = this.configService.get<string>('NOTION_PAGE_ID') || '';
        const response = await this.notionClient.databases.query({
            database_id: notionPageId
        });
        
        return response;
    }
}


