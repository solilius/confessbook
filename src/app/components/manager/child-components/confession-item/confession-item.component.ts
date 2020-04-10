import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Confession } from '../../../../models/confession/confession.module';
import { ConfessionsService } from '../../../../services/confessions.service';
import Swal from 'sweetalert2'


@Component({
    selector: 'app-confession-item',
    templateUrl: './confession-item.component.html',
    styleUrls: ['./confession-item.component.css']
})
export class ConfessionItemComponent implements OnInit {
    @Input() confession: Confession;
    @Output() removeConfession: EventEmitter<string> = new EventEmitter();
    isOpen = false;
    cursor = 'pointer';
    constructor(private confessionsService: ConfessionsService) { }

    ngOnInit(): void {

    }

    toggleItem() {
        (this.isOpen) ? this.cursor = 'pointer' : this.cursor = 'default'
        this.isOpen = !this.isOpen;
    }
    async saveConfession() {
        Swal.fire({
            title: 'עדכן וידוי',
            text: "האם את/ה בטוח/ה?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#228B22',
            confirmButtonText: 'שמור',
            cancelButtonText: 'ביטול'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const res = await this.confessionsService.updateConfession(this.confession);
                    if (res.status === "success") {
                        Swal.fire(
                            'הוידוי נשמר בהצלחה!',
                            '',
                            'success'
                        );
                    } else {
                        SwalError('שמירת הוידוי נכשלה', null);
                    }
                } catch (error) {
                    SwalError('שמירת הוידוי נכשלה', error);
                }

            }
        })
    }
    async archiveConfession() {
        Swal.fire({
            title: 'מחק וידוי',
            text: "מחיקת הודוי תעביר אותו לארכיון, האם את/ה בטוח/ה?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#FF0000',
            cancelButtonColor: '#b2b2b2',
            confirmButtonText: 'מחק',
            cancelButtonText: 'ביטול'
        }).then(async (result) => {
            if (result.value) {
                try {
                    this.confession.isArchived = true;
                    const res = await this.confessionsService.updateConfession(this.confession);
                    if (res.status === "success") {
                        Swal.fire(
                            'הוידוי נמחק בהצלחה!',
                            '',
                            'success'
                        ).then(() => {
                            this.removeConfession.emit(this.confession._id);
                            this.toggleItem();
                        })

                    } else {
                        SwalError('מחיקת הוידוי הכשלה', null);
                    }
                } catch (error) {
                    SwalError('מחיקת הוידוי הכשלה', error)
                }
            }
        })
    }
    async postConfession() {
        Swal.fire({
            title: 'העלה וידויי',
            text: "האם את/ה בטוח/ה שברצונך להעלות את הוידוי כעת?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#51BDFF',
            cancelButtonColor: '#b2b2b2',
            confirmButtonText: 'העלה',
            cancelButtonText: 'ביטול'
        }).then(async (result) => {
            if (result.value) {
                try {
                    this.confession.updated_by = localStorage.getItem('username');
                    const res = await this.confessionsService.postConfessionToFB(this.confession);
                    if (res.status === "success") {
                        Swal.fire(
                            'הוידוי הועלה בהצלחה!',
                            '',
                            'success'
                        ).then(() => {
                            this.removeConfession.emit(this.confession._id);
                            this.toggleItem();
                        })

                    } else {
                        SwalError('העלאת פוסט נכשלה', null);

                    }
                } catch (error) {
                    SwalError('העלאת פוסט נכשלה', error);
                }
            }
        })
    }
}

function SwalError(msg, err) {
    console.log(JSON.stringify(err));
    Swal.fire('אופס', msg, 'error');
}
