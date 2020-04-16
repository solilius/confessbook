import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Confession } from 'src/app/models/confession/confession.module';
import { FacebookPostsService } from 'src/app/services/facebook-posts.service';
import { CommonService } from 'src/app/services/common.service';
import { SchedulePostDialogComponent } from '../schedule-post-dialog/schedule-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
    @Input() post: Confession;
    @Output() removePost: EventEmitter<string> = new EventEmitter();
    postingDate: string
    timeToPost: string;
    isExtended = false;

    constructor(private facebookPostsService: FacebookPostsService, private commonService: CommonService, public dialog: MatDialog) { }

    ngOnInit(): void {
        moment.locale('he');
        this.postingDate = moment(this.post.fb_scheduled_date).format('MMMM Do YYYY, HH:mm');
        setInterval(() => {
            this.timeToPost = moment(this.post.fb_scheduled_date).fromNow();
        }, 900)
    }

    schedulePost() {
        const dialogRef = this.dialog.open(SchedulePostDialogComponent, {
            width: '20%',
            data: this.post.fb_scheduled_date
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                try {
                    this.commonService.setSpinnerMode(true);
                    await this.facebookPostsService.patchTime(this.post.post_id, result);
                    this.post.fb_scheduled_date = result;
                    this.post.updated_by = localStorage.getItem('username');
                    Swal.fire('תזמון הפוסט עודכן בהצלחה!', '', 'success');

                } catch (error) {
                    Swal.fire("אופס", "עדכון זמן העלאת הפוסט נכשל", "error");
                }

                this.commonService.setSpinnerMode(false);
            }
        });
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
                this.commonService.setSpinnerMode(true);
                await this.facebookPostsService.updatePost(this.post);
                Swal.fire('הפוסט עודכן בהצלחה!', '', 'success');

            } catch (error) {
                Swal.fire("אופס", "עדכון הפוסט נכשל", "error");
            }
            this.commonService.setSpinnerMode(false);
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
                this.commonService.setSpinnerMode(true);
                await this.facebookPostsService.deletePost(this.post.post_id);
                this.removePost.emit(this.post._id);
                Swal.fire('תזמון הפוסט בוטל בהצלחה!', '', 'success');

            } catch (error) {
                Swal.fire("אופס", "ביטול תזמון הפוסט נכשל", "error");
            }
            this.commonService.setSpinnerMode(false);
        }
    }
}
