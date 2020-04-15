import { Component, OnInit } from '@angular/core';
import { SchedulersService } from '../../../../services/schedulers.service';
import { Scheduler } from '../../../../models/scheduler/scheduler.module'
import Swal from 'sweetalert2';
import { SchedulerAddComponent } from '../scheduler-add/scheduler-add.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent implements OnInit {
    schedulers: Scheduler[];

    constructor(private service: SchedulersService, public dialog: MatDialog) {
        this.schedulers = [];
    }
    async ngOnInit(): Promise<any> {
        try {
            this.schedulers = await this.service.getSchedulers();

        } catch (error) {
            Swal.fire({
                title: 'אופס',
                text: error.error.message,
                icon: 'warning',
                confirmButtonText: 'אוקיי'
            });
        }
    }

    createScheduler() {
        const dialogRef = this.dialog.open(SchedulerAddComponent, {
            width: '27vw',
            data: { scheduler: {} }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.schedulers.push(result);
            }
        });
    }
    removeScheduler(id: string) {
        this.schedulers = this.schedulers.filter(scheduler => scheduler._id !== id);
    }
}