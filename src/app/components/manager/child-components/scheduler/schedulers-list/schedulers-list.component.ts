import { Component, OnInit } from '@angular/core';
import { SchedulersService } from '../../../../../services/schedulers.service';
import { CommonService } from '../../../../../services/common.service';
import { Scheduler } from '../../../../../models/scheduler/scheduler.module'
import { MatDialog } from '@angular/material/dialog';
import { SchedulerAddComponent } from '../../scheduler-add/scheduler-add.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-schedulers-list',
    templateUrl: './schedulers-list.component.html',
    styleUrls: ['./schedulers-list.component.css']
})
export class SchedulersListComponent implements OnInit {
    schedulers: Scheduler[];
    isMobile: boolean;
    constructor(private schedulersService: SchedulersService, private commonService: CommonService, public dialog: MatDialog) {
        this.schedulers = [];
    }
    async ngOnInit(): Promise<any> {
        try {
            this.schedulers = await this.schedulersService.getSchedulers();
            this.isMobile = this.commonService.isMobile();

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
            maxWidth: (!this.isMobile) ? '27vw' : '100vw',
            width: (!this.isMobile) ? '27vw' : '100vw',

            data: this.schedulers.map(s => s.name)
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                try {
                    this.commonService.setSpinnerMode(true);
                    const res = await this.schedulersService.createScheduler(result);
                    result._id = res._id;
                    Swal.fire("התזמון נשמר", "התזמון נשמר בהצלחה !", "success");
                    this.schedulers.push(result);
                } catch (error) {
                    console.log(error);
                    Swal.fire("אופס", "ארעה תקלה בשמירת התזמון", "error");
                }
                this.commonService.setSpinnerMode(false);
            }
        });
    }
    removeScheduler(id: string) {
        this.schedulers = this.schedulers.filter(scheduler => scheduler._id !== id);
    }
}