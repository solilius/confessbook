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

    ngOnInit(): void {}

    unarchiveConfession() {
        let text = "האם את/ה בטוח/ה שברצונך להעביר את הוידוי חזרה מהארכיון לדף הראשי?";
        if (this.confession.serial !== undefined){
            text = "וידוי זה כבר פורסם האם את/ה בטוח/ה שברצונך להחזיר אותו לדף הראשי?"
        }
        Swal.fire({
            title: 'לשחזר ודוי',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'שחזר',
            cancelButtonText: 'ביטול'
        }).then((result) => {
            if (result.value) {
                this.confessionsService.unarchiveConfession(this.confession._id).subscribe((res) => {
                    if (res.status === "success") {
                        Swal.fire(
                            'הוידוי שוחזר בהצלחה!',
                            '',
                            'success'
                        ).then(() => {
                            console.log('success');
                            this.removeConfession.emit(this.confession._id);
                        })

                    } else {
                        Swal.fire(
                            'אופס',
                            'שיחזור הוידוי נכשל',
                            'warning'
                        )
                    }
                });
            }
        })
    }
}
