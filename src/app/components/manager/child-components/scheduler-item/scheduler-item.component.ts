import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Scheduler } from '../../../../models/scheduler/scheduler.module';
import { SchedulersService } from '../../../../services/schedulers.service';
import { CommonService } from '../../../../services/common.service';

import Swal from 'sweetalert2'

@Component({
    selector: 'app-scheduler-item',
    templateUrl: './scheduler-item.component.html',
    styleUrls: ['./scheduler-item.component.css']
})

export class SchedulerItemComponent implements OnInit {
    @Input() scheduler: Scheduler;
    @Output() removeScheduler: EventEmitter<string> = new EventEmitter();
    @Output() addScheduler: EventEmitter<Scheduler> = new EventEmitter();

    constructor(private schedulersService: SchedulersService, private commonService:CommonService) { }

    async ngOnInit(): Promise<void> {}

    async activateScheduler({ checked }) {
        this.scheduler.isActive = checked;
        try {
        this.commonService.setSpinnerMode(true);
        await this.schedulersService.activateScheduler(this.scheduler._id, checked);
        } catch (err) {
            this.scheduler.isActive = !checked;
            Swal.fire('אופס', "שינוי הסטטוס נכשל", 'error');
        }
        this.commonService.setSpinnerMode(false);
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
            if (res.value) {
                this.commonService.setSpinnerMode(true);
                await this.schedulersService.deleteScheduler(this.scheduler._id);
                this.removeScheduler.emit(this.scheduler._id);
                Swal.fire('התזמון נמחק בהצלחה', "", 'success');
            }

        } catch (error) {
            Swal.fire('אופס', "  מחיקת הזתמון נכשלה", 'error');
        }
        this.commonService.setSpinnerMode(false);
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
            if (res.value) {
                this.commonService.setSpinnerMode(true);
                await this.schedulersService.updateScheduler(this.scheduler);
                Swal.fire('התזמון עודכן בהצלחה', "", 'success');
            }

        } catch (error) {
            Swal.fire('אופס', "עדכון הזתמון נכשל", 'error');
        }
        this.commonService.setSpinnerMode(false);
    }

    updateRule(rule: string) {
        this.scheduler.rule = rule;
    }

    updateTag(tag) {
        this.scheduler.tag = tag;
    }
}