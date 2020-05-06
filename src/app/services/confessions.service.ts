import { Injectable } from '@angular/core';
import { Confession } from '../models/confession/confession.module';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class ConfessionsService {
    baseUrl: string;

    constructor(private service: CommonService) {
        this.baseUrl = `${environment.server}/confessions`;
    }

    getConfessions(isArchived: boolean, limit: number, page: number): Promise<Confession[]> {
        return this.service.request('get', `${this.baseUrl}?isArchived=${isArchived}&limit=${limit}&page=${page}`);
    }

    postConfession(confession: string): Promise<any> {
        return this.service.request('post', this.baseUrl, { message: confession });
    }

    updateConfession(confession: Confession): Promise<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.service.request('put', `${this.baseUrl}/${confession._id}`, confession);
    }

    patcArchived(id: string, isArchived: boolean) {
        const user = localStorage.getItem('username');
        return this.service.request('patch', `${this.baseUrl}/archive/${id}?isArchived=${isArchived}&user=${user}`);
    }

    deleteConfession(id: string): Promise<any> {
        return this.service.request('delete', `${this.baseUrl}/${id}?user=${localStorage.getItem('username')}`);
    }
}
