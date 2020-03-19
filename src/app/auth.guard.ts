import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private cookie: CookieService, private router: Router) {

    }
    canActivate(): boolean {
        if (!!this.cookie.get('token') && !!localStorage.getItem('username')) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
