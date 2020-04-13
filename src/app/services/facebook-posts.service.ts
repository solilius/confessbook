import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Confession } from '../models/confession/confession.module';

@Injectable({
    providedIn: 'root'
})
export class FacebookPostsService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.server}/facebook`;
    }

    request(method: string, url: string, body?: any): Promise<any> {
        return this.http.request(method, url,
            {
                body: body,
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                withCredentials: true
            }).toPromise();
    }

    getPosts(): Promise<Confession[]> {
        return this.request('get', `${this.baseUrl}`);
    }

    post(confession: Confession): Promise<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.request('post', `${this.baseUrl}`, confession);
    }

    schedule(confession: Confession): Promise<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.request('post', `${this.baseUrl}/schedule`, confession);
    }

    updatePost(confession: Confession): Promise<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.request('put', `${this.baseUrl}/${confession._id}`, confession);
    }

    deletePost(id: string): Promise<any> {
        return this.request('delete', `${this.baseUrl}/${id}?user=${localStorage.getItem('username')}`);
    }

}
