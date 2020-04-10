import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Scheduler } from '../../../../models/scheduler/scheduler.module';
import { SchedulersService } from '../../../../services/schedulers.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-scheduler-item',
    templateUrl: './scheduler-item.component.html',
    styleUrls: ['./scheduler-item.component.css']
})
export class SchedulerItemComponent implements OnInit {
    @Input() scheduler: Scheduler;
    @Output() removeScheduler: EventEmitter<string> = new EventEmitter();
    allTags: string[];
    constructor(private service: SchedulersService) { }

    async ngOnInit(): Promise<void> {
        this.allTags = await this.service.getTags();
    }

    async activateScheduler({ checked }) {
        this.scheduler.isActive = checked;
        try {
            const res = await this.service.activateScheduler(this.scheduler._id, checked);
            console.log(res.status);
        } catch (err) {
            this.scheduler.isActive = !checked;
            Swal.fire('אופס', "שינוי הסטטוס נכשל", 'error');
        }
    }
    updateRule(rule:string){
        this.scheduler.rule = rule;
    }

    async deleteScheduler() {
        try {
            const res = await Swal.fire({
                title: 'מחק תזמון',
                text: "האם את/ה בטוח/ה שברצונך למחוק תזמון זה?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'מחק',
                cancelButtonText: 'ביטול'
            });
            if (res) {
                await this.service.deleteScheduler(this.scheduler._id);
                this.removeScheduler.emit(this.scheduler._id);
                Swal.fire('התזמון נמחק בהצלחה', "", 'success');
            }

        } catch (error) {
            Swal.fire('אופס', "  מחיקת הזתמון נכשלה", 'error');
        }
    }

    async updateScheduler() {
        try {
            const res = await Swal.fire({
                title: 'עדכן תזמון',
                text: "האם את/ה בטוח/ה שברצונך לשמור שינויים  בתזמון זה?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'שמור',
                cancelButtonText: 'ביטול'
            });
            if (res) {
                await this.service.updateScheduler(this.scheduler);
                Swal.fire('התזמון עודכן בהצלחה', "", 'success');
            }

        } catch (error) {
            Swal.fire('אופס', "עדכון הזתמון נכשל", 'error');
        }
    }
}
