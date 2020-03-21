import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Confession } from '../../../../models/confession/confession.module';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Router } from '@angular/router';
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
    constructor(private confessionsService: ConfessionsService, private router: Router) { }

    ngOnInit(): void {

    }

    toggleItem() {
        (this.isOpen) ? this.cursor = 'pointer' : this.cursor = 'default'
        this.isOpen = !this.isOpen;
    }
    saveConfession() {
        Swal.fire({
            title: 'עדכן וידוי',
            text: "האם את/ה בטוח/ה?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#228B22',
            confirmButtonText: 'שמור',
            cancelButtonText: 'ביטול'
        }).then((result) => {
            if (result.value) {
                this.confessionsService.updateConfession(this.confession).subscribe((res) => {
                    if (res.status === "success") {
                        Swal.fire(
                            'הוידוי נשמר בהצלחה!',
                            '',
                            'success'
                        );
                    } else {
                        Swal.fire(
                            'אופס',
                            'שמירת הוידוי נכשלה',
                            'warning'
                        )
                    }
                });
            }
        })
    }
    archiveConfession() {
        Swal.fire({
            title: 'מחק וידוי',
            text: "מחיקת הודוי תעביר אותו לארכיון, האם את/ה בטוח/ה?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#FF0000',
            cancelButtonColor: '#b2b2b2',
            confirmButtonText: 'מחק',
            cancelButtonText: 'ביטול'
        }).then((result) => {
            if (result.value) {
                this.confession.archived = true;
                this.confessionsService.updateConfession(this.confession).subscribe((res) => {
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
                        Swal.fire(
                            'אופס',
                            'מחיקת הוידוי נכשלה',
                            'warning'
                        )
                    }
                });
            }
        })
    }
    postConfession() {
        Swal.fire({
            title: 'העלה וידויי',
            text: "האם את/ה בטוח/ה שברצונך להעלות את הוידוי כעת?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#51BDFF',
            cancelButtonColor: '#b2b2b2',
            confirmButtonText: 'העלה',
            cancelButtonText: 'ביטול'
        }).then((result) => {
            if (result.value) {
                this.confession.updated_by = localStorage.getItem('username');
                this.confessionsService.postConfessionToFB(this.confession).subscribe((res) => {
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
                        Swal.fire(
                            'אופס',
                            'העלאת הוידוי נכשלה',
                            'warning'
                        )
                    }
                });
            }
        })
    }
}
