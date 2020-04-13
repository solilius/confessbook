import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-schedule-post-dialog',
    templateUrl: './schedule-post-dialog.component.html',
    styleUrls: ['./schedule-post-dialog.component.css']
})
export class SchedulePostDialogComponent implements OnInit {
    @ViewChild('picker') picker: any;
    @ViewChild('date') date: any;

    constructor(
        public dialogRef: MatDialogRef<SchedulePostDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Date) {
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

    saveDate() {
        if (this.validated()) {
            this.dialogRef.close(this.date.nativeElement.value);
        }
    }

    ngOnInit(): void {
    }

    private validated(): boolean {
        const date = this.date.nativeElement.value;
        if (date === "") {
            Swal.fire("אנא בחר/י תאריך וזמן", "", "warning");
            return false;
        } else if (new Date(date).getTime() <= new Date().getTime() + 600) {
            Swal.fire("הזמן צריך להיות גדול מ10 דקות מעכשיו\n (הגבלה של פייסבוק)", "", "warning");
            return false;
        } else {
            return true;
        }
    }

}