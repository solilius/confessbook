import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Scheduler } from '../../../../models/scheduler/scheduler.module';
import { SchedulersService } from '../../../../services/schedulers.service';
import Swal from 'sweetalert2'
import { Tag } from '../../../../interfaces/tag';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-scheduler-item',
    templateUrl: './scheduler-item.component.html',
    styleUrls: ['./scheduler-item.component.css']
})

export class SchedulerItemComponent implements OnInit {
    @Input() scheduler: Scheduler;
    @Output() removeScheduler: EventEmitter<string> = new EventEmitter();
    myControl = new FormControl();
    filteredTags: Observable<Tag[]>;

    allTags: Tag[];
    constructor(private service: SchedulersService) { }

    async ngOnInit(): Promise<void> {
        this.allTags = await this.service.getTags();
        this.myControl.setValue({ name: this.scheduler.tag });
        this.filteredTags = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(tag => tag ? this._filter(tag) : this.allTags.slice())
            );

    }

    async activateScheduler({ checked }) {
        this.scheduler.isActive = checked;
        try {
            const res = await this.service.activateScheduler(this.scheduler._id, checked);
        } catch (err) {
            this.scheduler.isActive = !checked;
            Swal.fire('אופס', "שינוי הסטטוס נכשל", 'error');
        }
    }
    updateRule(rule: string) {
        this.scheduler.rule = rule;
    }

    updateTag(event) {
        this.scheduler.tag = event.target.value;
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
            if (res.value) {
                await this.service.updateScheduler(this.scheduler);
                Swal.fire('התזמון עודכן בהצלחה', "", 'success');
            }

        } catch (error) {
            Swal.fire('אופס', "עדכון הזתמון נכשל", 'error');
        }
    }

    displayFn(tag: Tag): string {
        return tag && tag.name ? tag.name : '';
    }

    private _filter(name: string): Tag[] {
        const filterValue = name.toLowerCase();

        return this.allTags.filter(tag => tag.name.indexOf(filterValue) === 0);
    }
}
