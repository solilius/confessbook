import { Component, OnInit, HostListener } from '@angular/core';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Confession } from '../../../../models/confession/confession.module'
import Swal from 'sweetalert2';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
    @HostListener("scroll", ["$event"])
    confessions: Confession[] = [];
    pageLimit: number = 10;
    page: number = 1;
    constructor(private confessionsService: ConfessionsService) { }

    async ngOnInit(): Promise<any> {
        try {
            this.confessions = await this.confessionsService.getConfessions(false, this.pageLimit, this.page);
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
    removeConfession(id) {
        this.confessions = this.confessions.filter(c => c._id !== id);
    }

    lastItemClicked(id) {
        if (id === this.confessions[this.confessions.length - 1]._id) {
            const objDiv = document.getElementById("confession-list");
            setTimeout(() => {
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 300);
        }
    }


    async loadConfessions() {
        try {
            const loadedConfessions = await this.confessionsService.getConfessions(false, this.pageLimit, this.page);
            this.confessions = this.confessions.concat(loadedConfessions);
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