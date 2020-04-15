import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Confession } from '../../../../models/confession/confession.module';
import { ConfessionsService } from '../../../../services/confessions.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-archived-confession-item',
    templateUrl: './archived-confession-item.component.html',
    styleUrls: ['./archived-confession-item.component.css']
})
export class ArchivedConfessionItemComponent implements OnInit {
    @Input() confession: Confession;
    @Output() removeConfession: EventEmitter<string> = new EventEmitter();

    constructor(private confessionsService: ConfessionsService, private router: Router) { }

    ngOnInit(): void { }
    async deleteConfession() {
        const swalRes = await Swal.fire({
            title: 'מחיקת וידוי',
            text: 'מחיקת וידוי מהארכיון היא לצמיתות האם את/ה בטוח/ה?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'מחק',
            cancelButtonText: 'ביטול'
        });
        if (swalRes.value) {
            try {
                await this.confessionsService.deleteConfession(this.confession._id);
                await Swal.fire('הוידוי נחמחק בהצלחה!', '', 'success')
                this.removeConfession.emit(this.confession._id);
            } catch (error) {
                SwalError('מחיקת הוידוי נכשלה', error)
            }
        }
    }

    async unarchiveConfession() {
        let text = "האם את/ה בטוח/ה שברצונך להעביר את הוידוי חזרה מהארכיון לדף הראשי?";
        if (this.confession.serial !== undefined) {
            text = "וידוי זה כבר פורסם האם את/ה בטוח/ה שברצונך להחזיר אותו לדף הראשי?"
        }
        const swalRes = await Swal.fire({
            title: 'לשחזר ודוי',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'שחזר',
            cancelButtonText: 'ביטול'
        });
        if (swalRes.value) {
            try {
                await this.confessionsService.patcArchived(this.confession._id, false);
                await Swal.fire('הוידוי שוחזר בהצלחה!', '', 'success')
                this.removeConfession.emit(this.confession._id);

            } catch (error) {
                SwalError('שחזור הוידוי נכשל', error)
            }
        }
    }
}

function SwalError(msg, err) {
    console.log(JSON.stringify(err));
    Swal.fire('אופס', msg, 'error');
}