import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
    activeTab: string;
    systemName: string;
    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.navigateByUrl(`/manager/main`);
        this.activeTab = 'main';
        this.systemName = environment.system;
    }

    loadChild(page: string, e) {
        this.activeTab = page;
        this.router.navigateByUrl(`/manager/${page}`);
    }

    setClasses(page: string) {
        return {'active': this.activeTab === page};
    }

}
