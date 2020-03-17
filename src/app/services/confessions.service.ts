import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Confession } from '../models/confession/confession.module';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
};


@Injectable({
    providedIn: 'root'
})
export class ConfessionsService {
    
    serverUrl: string = environment.serverURL;

    constructor(private http: HttpClient, private cookie: CookieService) { }

    login(data: Object): Observable<any> {
        return this.http.post<any>(`${this.serverUrl}/login`, data, httpOptions).pipe(map(res => {
            console.log(res.token);
            this.cookie.set('token', res.token);
        }));
    }

    postConfession(confession: string): Observable<any> {
        return this.http.post<any>(`${this.serverUrl}/confessions`, { message: confession }, httpOptions);
    }

    getConfessions(isArchived: boolean) {
        return this.http.get<Confession[]>(`${this.serverUrl}/confessions?archived=${isArchived}`);
    }

    unarchiveConfession(id:string) {
        return this.http.put<any>(`${this.serverUrl}/confessions/unarchive/${id}`, {}, httpOptions);
    }

    deleteConfession(id: string): Observable<any> {
        return this.http.delete(`${this.serverUrl}/confessions/${id}?user=${localStorage.getItem('username')}`);
    }

    postConfessionToFB(confession: Confession): Observable<any> {
        return this.http.put<any>(`${this.serverUrl}/confessions`, confession, httpOptions);
    }
}
