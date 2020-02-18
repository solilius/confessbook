export class Confession {
    _id: string;
    archived: boolean;
    message: string;
    created_date: Date;
    comment?: string;
    post_by?: string;
    post_date?: Date;
    serial?: number;
}
