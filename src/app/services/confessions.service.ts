import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Confession } from '../models/confession/confession.module';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
};

@Injectable({
    providedIn: 'root'
})
export class ConfessionsService {
    allTags: string[];

    constructor(private http: HttpClient, private cookie: CookieService) { }

    login(data: Object): Observable<any> {
        return this.http.post<any>(`${environment.server}/login`, data, httpOptions).pipe(map(res => { }));
    }

    getConfessions(isArchived: boolean): Observable<any> {
        return this.http.get<Confession[]>(`${environment.server}/confessions?archived=${isArchived}`);
    }

    postConfession(confession: string): Observable<any> {
        return this.http.post<any>(`${environment.server}/confessions`, { message: confession }, httpOptions);
    }

    updateConfession(confession: Confession): Observable<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.http.put<any>(`${environment.server}/confessions/${confession._id}`, confession, httpOptions);
    }

    deleteConfession(id: string): Observable<any> {
        return this.http.delete(`${environment.server}/confessions/${id}?user=${localStorage.getItem('username')}`);
    }

    postConfessionToFB(confession: Confession): Observable<any> {
        confession.updated_by = localStorage.getItem('username');
        return this.http.post<any>(`${environment.server}/confessions/fb`, confession, httpOptions);
    }

    getAppData(): Observable<any> {
        return this.http.get<any[]>(`${environment.server}/app`);
    }
}
