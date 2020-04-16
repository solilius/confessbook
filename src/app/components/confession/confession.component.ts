import { Component, OnInit } from '@angular/core';
import { ConfessionsService } from '../../services/confessions.service';
import { CommonService } from '../../services/common.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-confession',
    templateUrl: './confession.component.html',
    styleUrls: ['./confession.component.css']
})
export class ConfessionComponent implements OnInit {
    confession: string;
    appName: string;
    intro: string;
    isSent: boolean;
    constructor(private confessionsService: ConfessionsService, private commonService: CommonService, private titleService: Title) { }

    async ngOnInit(): Promise<any> {
        this.isSent = false;
        try {
            const res = await this.confessionsService.getAppData();
            this.titleService.setTitle(res.name);
            this.appName = res.name;
            this.intro = res.intro;
        } catch (error) {
            console.log(error);
        }
    }

    async sendConfession() {
        if (this.confession && this.confession.length >= 10) {
            try {
                this.commonService.setSpinnerMode(true);
                const res = await this.confessionsService.postConfession(this.confession);
                if (res.status === "success") {
                    this.isSent = true;
                }

            } catch (error) {
                Swal.fire({
                    title: 'אופס',
                    text: 'אראה שגיאה בשמירה, אנא נסו מאוחר יותר',
                    icon: 'error',
                    confirmButtonText: 'סליחה'
                })
            }
        } else {
            Swal.fire({
                title: 'אמממ...',
                text: 'בבקשה כתבו משהו שארוך יותר מ10 אותיות ',
                icon: 'warning',
                confirmButtonText: 'סבבה'
            })
        }

        this.commonService.setSpinnerMode(false);
    }
}