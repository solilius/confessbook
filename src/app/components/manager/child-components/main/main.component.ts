import { Component, OnInit } from '@angular/core';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Confession } from '../../../../models/confession/confession.module'
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
    confessions: Confession[];

    constructor(private confessionsService: ConfessionsService, private router: Router) { }
    ngOnInit(): void {
        this.confessionsService.getConfessions(false).subscribe(confessions => {
            this.confessions = confessions;
        }, (err) => {
            this.router.navigateByUrl('/login');
            alert(err.error);
        })
    }

    removeConfession(id){
        this.confessions = this.confessions.filter( c => c._id !== id);
    }
}
