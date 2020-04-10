import { Component, OnInit, Output } from '@angular/core';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Confession } from '../../../../models/confession/confession.module'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Portal } from '@angular/cdk/portal';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
    confessions: Confession[];
    displayedConfessions: Confession[];
    displayPosted: boolean;
    color: string;

    constructor(private confessionsService: ConfessionsService, private router: Router) { }
    async ngOnInit(): Promise<any> {
        this.displayedConfessions = [];
        this.color = "primary";
        this.displayPosted = false;
        try {
            this.confessions = await this.confessionsService.getConfessions(true);
            this.displayedConfessions = this.confessions;
        } catch (error) {
            Swal.fire({
                title: 'אופס',
                text: error.error.message,
                icon: 'warning',
                confirmButtonText: 'אוקיי'
            });
        }
    }

    removeConfession(id) {
        this.displayedConfessions = this.displayedConfessions.filter(c => c._id !== id);
    }

    filter() {
        this.displayPosted = !this.displayPosted;
        this.displayedConfessions = (this.displayPosted) ? this.confessions.filter(c => c.serial == null) : this.confessions;
    }
}
