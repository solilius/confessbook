import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
    activeTab: string;
    appName: string;
    fbPage: string;
    loginText: string;
    isMobile: boolean;
    isSideBarOpen: boolean = false;
    constructor(private service: CommonService, private router: Router) { }

    async ngOnInit(): Promise<any> {
        this.isMobile = this.service.isMobile();
        if (location.href.split('/').pop() == "manager") this.router.navigateByUrl(`/manager/main`);

        try {
            const res = await this.service.getAppData();
            this.appName = res.name;
            this.fbPage = `https://www.facebook.com/${res.pageID}`;
        } catch (error) {
            console.log(error);
        }
        this.activeTab = location.href.split('/').pop();
        this.loginText = `${localStorage.getItem('username')} מחובר`;
    }

    loadChild(page: string) {
        this.activeTab = page;
        this.router.navigateByUrl(`/manager/${page}`);
        this.isSideBarOpen = false;
    }



    toggleSideBar() {
        this.isSideBarOpen = !this.isSideBarOpen;
    }
}
