import { Component, OnInit, Output, HostListener } from '@angular/core';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Confession } from '../../../../models/confession/confession.module'
import Swal from 'sweetalert2';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
    @HostListener("scroll", ["$event"])
    confessions: Confession[] = [];
    pageLimit: number = 20;
    page: number = 1;
    displayedConfessions: Confession[] = [];
    displayPosted: boolean = false;
    color: string = "primary";

    constructor(private confessionsService: ConfessionsService) { }
    async ngOnInit(): Promise<any> {
        this.loadConfessions();
    }

    removeConfession(id) {
        this.displayedConfessions = this.displayedConfessions.filter(c => c._id !== id);
        this.confessions = this.confessions.filter(c => c._id !== id);
    }

    filter() {
        this.displayPosted = !this.displayPosted;
        this.displayedConfessions = (this.displayPosted) ? this.confessions.filter(c => c.serial == null) : this.confessions;
    }

    async loadConfessions() {
        try {
            const loadedConfessions = await this.confessionsService.getConfessions(true, this.pageLimit, this.page);
            this.confessions = this.confessions.concat(loadedConfessions);
            this.displayedConfessions = this.displayedConfessions.concat(loadedConfessions);
            if (this.displayPosted === false) this.filter();
            this.page++;
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'אופס',
                text: error.error.message,
                icon: 'warning',
                confirmButtonText: 'אוקיי'
            });
        }
    }

    onScroll(event: any) {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            this.loadConfessions();
        }
    }
}