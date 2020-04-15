import { Component, OnInit, Input, Output } from '@angular/core';
import { Confession } from 'src/app/models/confession/confession.module';
import { FacebookPostsService } from 'src/app/services/facebook-posts.service';
import { ConfessionsService } from 'src/app/services/confessions.service';
import * as moment from 'moment';
import { SchedulePostDialogComponent } from '../schedule-post-dialog/schedule-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
    @Input() post: Confession;
    isExtended: boolean;
    constructor(private confessionsService: ConfessionsService, private facebookPostsService: FacebookPostsService, public dialog: MatDialog) { }

    ngOnInit(): void {
        moment.locale('he');
        this.isExtended = false;
    }

    extendPost() {
        this.isExtended = !this.isExtended;
    }

    updateText(event, field: string) {
        switch (field) {
            case 'message':
                this.post.message = event.target.value;
                break;
            case 'comment':
                this.post.comment = event.target.value;
                break;
        }
    }

    getDate(date: Date) {
        return moment(date).format('MMMM Do YYYY, HH:mm');
    }

    getLeft(date: Date) {
        return moment(date).fromNow();
    }

    schedulePost() {
        const dialogRef = this.dialog.open(SchedulePostDialogComponent, {
            width: '20%'
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                try {
                    await this.facebookPostsService.patchTime(this.post.post_id, result);
                    this.post.fb_scheduled_date = result;
                    this.post.updated_by = localStorage.getItem('username');
                    Swal.fire('תזמון הפוסט עודכן בהצלחה!', '', 'success');

                } catch (error) {
                    Swal.fire("אופס", "עדכון זמן העלאת הפוסט נכשל", "error");
                }
            }
        });
    }

    async updatePost() {
        const swalRes = await Swal.fire({
            title: 'עדכן פוסט',
            text: "האם את/ה בטוח/ה?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#228B22',
            confirmButtonText: 'שמור',
            cancelButtonText: 'ביטול'
        })
        if (swalRes.value) {
            try {
                await this.facebookPostsService.updatePost(this.post);
                Swal.fire('הפוסט עודכן בהצלחה!', '', 'success');

            } catch (error) {
                Swal.fire("אופס", "עדכון הפוסט נכשל", "error");
            }
        }
    }

    async cancelPost() {
        const swalRes = await Swal.fire({
            title: 'בטל תזמון הפוסט',
            text: "האם את/ה בטוח/ה?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: 'red',
            confirmButtonText: 'אישור',
            cancelButtonText: 'ביטול'
        })
        if (swalRes.value) {
            try {
                await this.facebookPostsService.deletePost(this.post.post_id);
                Swal.fire('תזמון הפוסט בוטל בהצלחה!', '', 'success');

            } catch (error) {
                Swal.fire("אופס", "ביטול תזמון הפוסט נכשל", "error");
            }
        }
    }
}
