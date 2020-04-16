import { Component, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
    selector: 'app-schedule-post-dialog',
    templateUrl: './schedule-post-dialog.component.html',
    styleUrls: ['./schedule-post-dialog.component.css']
})
export class SchedulePostDialogComponent {
    @ViewChild('picker') picker: any;
    @ViewChild('date') date: any;

    constructor(
        public dialogRef: MatDialogRef<SchedulePostDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public inputDate: Date) {}
    saveDate() {
        if (this.validated()) {
            this.dialogRef.close(this.date.nativeElement.value);
        }
    }

    private validated(): boolean {
        const date = this.date.nativeElement.value;
        if (date === "") {
            Swal.fire("אנא בחר/י תאריך וזמן", "", "warning");
            return false;
        } else if (moment(date).unix() <= moment().add(10, 'm').unix()) {

            Swal.fire("הזמן צריך להיות גדול מ10 דקות מעכשיו\n (הגבלה של פייסבוק)", "", "warning");
            return false;
        } else {
            return true;
        }
    }

}