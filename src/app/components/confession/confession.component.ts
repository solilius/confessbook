import { Component, OnInit } from '@angular/core';
import { ConfessionsService } from '../../services/confessions.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-confession',
    templateUrl: './confession.component.html',
    styleUrls: ['./confession.component.css']
})
export class ConfessionComponent implements OnInit {
    confession: string;
    isSent: boolean;
    constructor(private confessionsService: ConfessionsService, private router: Router) { }

    ngOnInit(): void {
        this.isSent = false;
     }

    sendConfession() {
        if (this.confession && this.confession.length >= 10) {
            this.confessionsService.postConfession(this.confession).subscribe(res => {
                if (res.status === "success") {
                     this.isSent = true;
                } else {
                    Swal.fire({
                        title: 'אופס',
                        text: 'אראה שגיאה בשמירה, אנא נסו מאוחר יותר',
                        icon: 'error',
                        confirmButtonText: 'סליחה'
                    })
                }
            });
        } else {
            Swal.fire({
                title: 'אמממ...',
                text: 'בבקשה כתבו משהו שארוך יותר מ10 אותיות ',
                icon: 'warning',
                confirmButtonText: 'סבבה'
            })
        }
    }
}
