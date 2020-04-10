import { Component, OnInit } from '@angular/core';
import { SchedulersService } from '../../../../services/schedulers.service';
import { Scheduler } from '../../../../models/scheduler/scheduler.module'
import Swal from 'sweetalert2';

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent implements OnInit {
    schedulers: Scheduler[];

    constructor(private service: SchedulersService) {
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

    removeScheduler(id) {
        this.schedulers = this.schedulers.filter(scheduler => scheduler._id !== id);
    }
}