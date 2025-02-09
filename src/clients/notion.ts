import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

let notionClient;

export async function getNotionBookshelfDatabase(notionKey: any, notionPageId: any): Promise<QueryDatabaseResponse> {
    if (notionClient == undefined)
        notionClient = new Client({ auth: process.env.NOTION_KEY });

    const response = await notionClient.databases.query({
        database_id: notionPageId
    });
    
    return response;
}
