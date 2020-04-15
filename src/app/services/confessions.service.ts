import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Confession } from '../models/confession/confession.module';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfessionsService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.server}/confessions`;
    }

    request(method: string, url: string, body?: any): Promise<any> {
        return this.http.request(method, url,
            {
                body: body,
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                withCredentials: true
            }).toPromise();
    }

    login(data: Object): Promise<any> {
        return this.request('post', `${environment.server}/login`, data);
    }

    getConfessions(isArchived: boolean): Promise<Confession[]> {
        return this.request('get', `${this.baseUrl}?isArchived=${isArchived}`);
    }

    postConfession(confession: string): Promise<any> {
        return this.request('post', this.baseUrl, { message: confession });
    }

    updateConfession(confession: Confession): Promise<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.request('put', `${this.baseUrl}/${confession._id}`, confession);
    }

    
    patcArchived(id: string, isArchived: boolean){
        const user = localStorage.getItem('username');
        return this.request('patch', `${this.baseUrl}/archive/${id}?isArchived=${isArchived}&user=${user}`);
    }

    deleteConfession(id: string): Promise<any> {
        return this.request('delete', `${this.baseUrl}/${id}?user=${localStorage.getItem('username')}`);
    }

    getAppData(): Promise<any> {
        return this.request('get', `${environment.server}/app`);
    }
}
