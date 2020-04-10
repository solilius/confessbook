import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scheduler } from '../models/scheduler/scheduler.module';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SchedulersService {
    baseUrl: string;
    allTags: string[];

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.server}/schedulers`;
    }

    request(method: string, url: string, body?: any): Promise<any> {
        return this.http.request(method, url,
            {
                body: body,
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                withCredentials: true
            }).toPromise();
    }

    getSchedulers(): Promise<Scheduler[]> {
        return this.http.get<Scheduler[]>(this.baseUrl).toPromise();
    }

    createScheduler(scheduler: Scheduler): Promise<Scheduler> {
        return this.request('post', this.baseUrl, { message: scheduler });
    }

    updateScheduler(scheduler: Scheduler): Promise<Scheduler> {
        return this.request('put', `${this.baseUrl}/${scheduler._id}`, scheduler);

    }

    activateScheduler(id: string, active: Boolean): Promise<any> {
        return this.request('patch', `${this.baseUrl}/${id}?active=${active}`);

    }

    deleteScheduler(id: string): Promise<any> {
        return this.request('delete', `${this.baseUrl}/${id}?user=${localStorage.getItem('username')}`);
    }

    async getTags() {
        if (!this.allTags) {
            this.allTags = await this.request('get', `${this.baseUrl}/tags`);
        }
        return Promise.resolve(this.allTags);
    }
}
