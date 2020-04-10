import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-cron-job',
    templateUrl: './cron-job.component.html',
    styleUrls: ['./cron-job.component.css']
})
export class CronJobComponent implements OnInit {
    @Input() job: string;
    @Output() updateRule: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    onRuleChanged(event){
        this.updateRule.emit(event.target.value);
    }
}
