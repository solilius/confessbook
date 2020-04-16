import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Scheduler } from '../../../../models/scheduler/scheduler.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-scheduler-add',
    templateUrl: './scheduler-add.component.html',
    styleUrls: ['./scheduler-add.component.css']
})
export class SchedulerAddComponent implements OnInit {
    @ViewChild('name') name: ElementRef;
    scheduler: Scheduler;
    constructor(
        public dialogRef: MatDialogRef<SchedulerAddComponent>,
        @Inject(MAT_DIALOG_DATA) public schedulers: string[]) { }

    ngOnInit(): void {
        this.scheduler = new Scheduler();
        this.scheduler.isActive = false;
    }

    initTag(tag: string) {
        this.scheduler.tag = tag;
    }

    initRule(rule: string) {
        this.scheduler.rule = rule;
    }

    initActivity(event) {
        this.scheduler.isActive = event.checked;
    }

    async createScheduler() {

        if (this.validateTag() && this.validateRule() && await this.validateName()) {
            this.scheduler.create_by = localStorage.getItem('username');
            this.scheduler.name = this.name.nativeElement.value;
            this.dialogRef.close(this.scheduler);
        }
    }

    private async validateName() {
        if (!this.name.nativeElement.value && this.name.nativeElement.value === "") {
            Swal.fire("אזהרה", "חובה למלא את השם לתזמון", "warning");
            return false;
        } else if (this.schedulers.filter(t =>  t === this.name.nativeElement.value).length > 0) {
            Swal.fire("אזהרה", "כבר קיים תזמון בשם זה", "warning");

            return false;
        } else {
            return true;
        }
    }

    private validateTag() {
        if (this.scheduler.tag) {
            return true;
        } else {
            Swal.fire("אזהרה", "חובה למלא את התגית לתזמון", "warning");
            return false;
        }
    }

    private validateRule() {
        if (this.scheduler.rule) {
            return true;
        } else {
            Swal.fire("אזהרה", "חובה למלא את החוק לתזמון", "warning");
            return false;
        }
    }
}
