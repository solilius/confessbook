import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Confession } from '../../../../models/confession/confession.module';
import { ConfessionsService } from '../../../../services/confessions.service';
import { FacebookPostsService } from '../../../../services/facebook-posts.service';
import { SchedulersService } from '../../../../services/schedulers.service';
import { Tag } from '../../../../interfaces/tag';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { SchedulePostDialogComponent } from '../schedule-post-dialog/schedule-post-dialog.component';

@Component({
    selector: 'app-confession-item',
    templateUrl: './confession-item.component.html',
    styleUrls: ['./confession-item.component.css']
})
export class ConfessionItemComponent implements OnInit {
    @Input() confession: Confession;
    @Output() removeConfession: EventEmitter<string> = new EventEmitter();
    updates: Tag[];
    isExtended = false;
    cursor = 'pointer';
    constructor(private confessionsService: ConfessionsService, private SchedulersService: SchedulersService,
        private FacebookPostsService: FacebookPostsService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.updates = [];
    }

    toggleItem() {
        (this.isExtended) ? this.cursor = 'pointer' : this.cursor = 'default'
        this.isExtended = !this.isExtended;
    }

    updateText(event, field: string) {
        switch (field) {
            case 'message':
                this.confession.message = event.target.value;
                break;
            case 'comment':
                this.confession.comment = event.target.value;
                break;
        }
    }

    saveUpdate(tag: Tag) {
        this.updates.push(tag);
    }

    async saveConfession() {
        const swalRes = await Swal.fire({
            title: 'עדכן וידוי',
            text: "האם את/ה בטוח/ה?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#228B22',
            confirmButtonText: 'שמור',
            cancelButtonText: 'ביטול'
        })
        if (swalRes.value) {
            try {
                this.confession.updated_by = localStorage.getItem('username');
                await this.confessionsService.updateConfession(this.confession);
                Swal.fire('הוידוי נשמר בהצלחה!', '', 'success');
                this.updates.forEach(tag => {
                    this.updateTagsService(tag);
                });
            } catch (error) {
                SwalError('שמירת הוידוי נכשלה', error);
            }
        }
    }
    async archiveConfession() {
        const swalRes = await Swal.fire({
            title: 'מחק וידוי',
            text: "מחיקת הודוי תעביר אותו לארכיון, האם את/ה בטוח/ה?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#FF0000',
            cancelButtonColor: '#b2b2b2',
            confirmButtonText: 'מחק',
            cancelButtonText: 'ביטול'
        });
        if (swalRes.value) {
            try {
                await this.confessionsService.patcArchived(this.confession._id, true);
                await Swal.fire('הוידוי נמחק בהצלחה!', '', 'success');
                this.removeConfession.emit(this.confession._id);
                this.toggleItem();
            } catch (error) {
                SwalError('מחיקת הוידוי הכשלה', error);
            }
        }
    }
    async scheduleConfession() {
        const dialogRef = this.dialog.open(SchedulePostDialogComponent, {
            width: '20%'
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                try {
                    this.confession.fb_scheduled_date = result;
                    this.confession.updated_by = localStorage.getItem('username');
                    await this.FacebookPostsService.schedule(this.confession);
                    this.removeConfession.emit(this.confession._id);
                    await Swal.fire('הוידוי תוזמן בהצלחה!', '', 'success');
                } catch (error) {
                    SwalError('תזמון פוסט נכשל', error);
                }
            }
        });
    }

    async postConfession() {
        const swalRes = await Swal.fire({
            title: 'העלה וידויי',
            text: "האם את/ה בטוח/ה שברצונך להעלות את הוידוי כעת?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#51BDFF',
            cancelButtonColor: '#b2b2b2',
            confirmButtonText: 'העלה',
            cancelButtonText: 'ביטול'
        });
        if (swalRes.value) {
            try {
                this.confession.updated_by = localStorage.getItem('username');
                await this.FacebookPostsService.post(this.confession);
                await Swal.fire('הוידוי הועלה בהצלחה!', '', 'success');
                this.removeConfession.emit(this.confession._id);
                this.toggleItem();
            } catch (error) {
                SwalError('העלאת פוסט נכשלה', error);
            }
        }
    }

    async updateTagsService(tag: Tag) {
        let index = -1;
        const tags = await this.SchedulersService.getTags();
        tags.forEach((obj, i) => {
            if (obj.name === tag.name) {
                index = i;
            }
        });
        if (index !== -1) {
            tags[index].value = tags[index].value + tag.value;
        } else if (tag.value === 1) {
            tags.push(tag);
        }
    };
}

function SwalError(msg, err) {
    console.log(JSON.stringify(err));
    Swal.fire('אופס', msg, 'error');
}