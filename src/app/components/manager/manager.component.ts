import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
    activeTab: string;
    appName: string;
    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.navigateByUrl(`/manager/main`);
        this.activeTab = 'main';
        this.appName = environment.appName;
    }

    loadChild(page: string) {
        this.activeTab = page;
        this.router.navigateByUrl(`/manager/${page}`);
    }

    setClasses(page: string) {
        return { 'active': this.activeTab === page };
    }

}
