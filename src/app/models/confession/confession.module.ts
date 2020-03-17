export class Confession {
    _id: string;
    archived: boolean;
    message: string;
    create_date: Date;
    comment?: string;
    updated_by?: string;
    update_date?: Date;
    serial?: number;
}
