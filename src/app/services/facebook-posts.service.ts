import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Confession } from '../models/confession/confession.module';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class FacebookPostsService {
    baseUrl: string;

    constructor(private service: CommonService) {
        this.baseUrl = `${environment.server}/facebook`;
    }

    getPosts(): Promise<Confession[]> {
        return this.service.request('get', `${this.baseUrl}`);
    }

    post(confession: Confession): Promise<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.service.request('post', `${this.baseUrl}`, confession);
    }

    schedule(confession: Confession): Promise<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.service.request('post', `${this.baseUrl}/schedule`, confession);
    }

    patchTime(id: string, date: Date) {
        const user = localStorage.getItem('username');
        return this.service.request('patch', `${this.baseUrl}/schedule/${id}?date=${date}&user=${user}`);
    }

    updatePost(post: Confession) {
        return this.service.request('put', `${this.baseUrl}/${post._id}`, post);
    }

    deletePost(id: string): Promise<any> {
        const user = localStorage.getItem('username');
        return this.service.request('delete', `${this.baseUrl}/${id}?user=${user}`);
    }
}
