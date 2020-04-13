export class Confession {
    _id: string;
    create_date: Date;
    update_date?: Date;
    updated_by?: string;
    message: string;
    comment?: string;
    serial?: number;
    post_id?: string;
    isArchived: boolean;
    tags: string[];
    fb_scheduled_date: Date;
}
