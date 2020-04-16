import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'confessions-angular';
    mode: ProgressSpinnerMode = "determinate";
    constructor(public CommonService: CommonService) {
        CommonService.getSpinnerMode().subscribe(res => {
            this.mode = res;
        });
    }
}