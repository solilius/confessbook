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

    constructor(private http: HttpClient, private cookie: CookieService) { }

    login(data: Object): Observable<any> {
        return this.http.post<any>(`${environment.server}/login`, data, httpOptions).pipe(map(res => {}));
    }

    postConfession(confession: string): Observable<any> {
        return this.http.post<any>(`${environment.server}/confessions`, { message: confession }, httpOptions);
    }

    getConfessions(isArchived: boolean) {
        return this.http.get<Confession[]>(`${environment.server}/confessions?archived=${isArchived}`);
    }

    unarchiveConfession(id: string) {
        return this.http.put<any>(`${environment.server}/confessions/unarchive/${id}`, {}, httpOptions);
    }

    deleteConfession(id: string): Observable<any> {
        return this.http.delete(`${environment.server}/confessions/${id}?user=${localStorage.getItem('username')}`);
    }

    postConfessionToFB(confession: Confession): Observable<any> {
        return this.http.put<any>(`${environment.server}/confessions`, confession, httpOptions);
    }
}
