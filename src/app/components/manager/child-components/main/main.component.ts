import { Component, OnInit } from '@angular/core';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Confession } from '../../../../models/confession/confession.module'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
    confessions: Confession[];

    constructor(private confessionsService: ConfessionsService, private router: Router) {
        this.confessions = [];
    }
    async ngOnInit(): Promise<any> {
        try {
            this.confessions = await this.confessionsService.getConfessions(false);
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
}