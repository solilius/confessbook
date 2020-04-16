import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AppData } from '../interfaces/app-data';
import { Injectable } from '@angular/core';
import { Tag } from '../interfaces/tag';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    mode: BehaviorSubject<ProgressSpinnerMode>;
    allTags: Tag[];
    appData: AppData;

    constructor(private http: HttpClient, private titleService: Title) {
        this.mode = new BehaviorSubject<ProgressSpinnerMode>('determinate');
        this.request('get', `${environment.server}/app`).then(res => {
            this.titleService.setTitle(res.name);
            this.appData = res;
        });
    }

    setSpinnerMode(mode: boolean) {
        this.mode.next((mode) ? 'indeterminate' : 'determinate');
    }

    getSpinnerMode(): Observable<ProgressSpinnerMode> {
        return this.mode.asObservable();
    }


    login(data: Object): Promise<any> {
        return this.request('post', `${environment.server}/login`, data);
    }

    request(method: string, url: string, body?: any): Promise<any> {
        return this.http.request(method, url,
            {
                body: body,
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                withCredentials: true
            }).toPromise();
    }

    async getTags() {
        if (!this.allTags) {
            this.allTags = await this.request('get', `${environment.server}/schedulers/tags`);
        }
        return Promise.resolve(this.allTags);
    }

    async getAppData(): Promise<any> {
        if (!this.appData) {
            this.appData = await this.request('get', `${environment.server}/app`);
            console.log(this.appData);
        }
        return Promise.resolve(this.appData);
    }
}
