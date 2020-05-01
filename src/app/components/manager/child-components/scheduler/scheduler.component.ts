import { Component } from '@angular/core';
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent {
    isMobile: boolean;
    isPostsPage: boolean;

    constructor(private commonService: CommonService) {
        this.isMobile = this.commonService.isMobile();
        this.isPostsPage = location.href.split('/')[location.href.split('/').length -1] === "posts";
    }
}