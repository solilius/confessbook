import { Component, OnInit } from '@angular/core';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Confession } from '../../../../models/confession/confession.module'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    confessions: Confession[];

    constructor(private confessionsService: ConfessionsService) { }
    ngOnInit(): void {
        this.confessionsService.getConfessions().subscribe(confessions => {
            this.confessions = confessions;
        })
    }
}
