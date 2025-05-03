export interface BookNotion {
    object: string;
    id: string;
    last_edited_time: string;
    created_by: CreatedBy;
    last_edited_by: CreatedBy;
    cover: string;
    icon: Icon;
    parent: Parent;
    archived: boolean;
    in_trash: boolean;
    properties: Properties;
    url: string;
    public_url: string;
}

export interface CreatedBy {
    object: string;
    id: string;
}

export interface Icon {
    type: string;
    external: {
        url: string;
    }
}

export interface Parent {
    type: string;
    database_id: string;
}

export interface Properties {
    id: string;
    type: string;
    value: any;
    has_more: boolean;
}