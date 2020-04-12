import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Confession } from '../../../../models/confession/confession.module';
import { ConfessionsService } from '../../../../services/confessions.service';
import { SchedulersService } from '../../../../services/schedulers.service';
import { Tag } from '../../../../interfaces/tag';
import Swal from 'sweetalert2'


@Component({
    selector: 'app-confession-item',
    templateUrl: './confession-item.component.html',
    styleUrls: ['./confession-item.component.css']
})
export class ConfessionItemComponent implements OnInit {
    @Input() confession: Confession;
    @Output() removeConfession: EventEmitter<string> = new EventEmitter();
    updates: Tag[];
    isOpen = false;
    cursor = 'pointer';
    constructor(private confessionsService: ConfessionsService, private SchedulersService: SchedulersService) { }

    ngOnInit(): void {
        this.updates = [];
    }

    toggleItem() {
        (this.isOpen) ? this.cursor = 'pointer' : this.cursor = 'default'
        this.isOpen = !this.isOpen;
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
                this.confession.isArchived = true;
                await this.confessionsService.updateConfession(this.confession);
                await Swal.fire('הוידוי נמחק בהצלחה!', '', 'success');
                this.removeConfession.emit(this.confession._id);
                this.toggleItem();
            } catch (error) {
                SwalError('מחיקת הוידוי הכשלה', error);
            }
        }
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
                await this.confessionsService.postConfessionToFB(this.confession);
                await Swal.fire('הוידוי הועלה בהצלחה!', '', 'success');
                this.removeConfession.emit(this.confession._id);
                this.toggleItem();
            } catch (error) {
                SwalError('העלאת פוסט נכשלה', error);
            }
        }
    }

    updateTagsService(tag: Tag) {
        let index = -1;
        this.SchedulersService.allTags.forEach((obj, i) => {
            if (obj.name === tag.name) {
                index = i;
            }
        });
        if (index !== -1) {
            this.SchedulersService.allTags[index].value = this.SchedulersService.allTags[index].value + tag.value;
        } else if (tag.value === 1) {
            this.SchedulersService.allTags.push(tag);
        }
    };
}

function SwalError(msg, err) {
    console.log(JSON.stringify(err));
    Swal.fire('אופס', msg, 'error');
}
