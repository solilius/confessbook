import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CronJobUtil, TimesTo, Times, Days } from 'src/app/interfaces/cron-job-util';
import { SchedulersService } from '../../services/schedulers.service';
import * as moment from 'moment';

@Component({
    selector: 'app-cron-job',
    templateUrl: './cron-job.component.html',
    styleUrls: ['./cron-job.component.css']
})
export class CronJobComponent implements OnInit {
    @Input() job: string;
    @Input() isActive: boolean;
    @Output() updateRule: EventEmitter<string> = new EventEmitter();
    CronJob: CronJobUtil;
    preview: string;
    previewTimeLeft: string;
    times = Times
    timesTo = TimesTo;
    days = Days;

    constructor(private service: SchedulersService) { }

    ngOnInit(): void {
        this.CronJob = parseCronJob(this.job);
        this.reloadRule(this.job);
        moment.locale('he');

    }

    async updateCronJob(event, src) {
        switch (src) {
            case 'timeUnit':
                this.CronJob.timeUnit = event.value;

                break;
            case 'dayOfWeek':
                this.CronJob.dayOfWeek = event.value;

                break;

            case 'dayOfMonth':
                this.CronJob.dayOfMonth = event.target.value;

                break;

            case 'time':
                this.CronJob.time = event.target.value;

                break;
        }
        const cronJobStr = generateCronJob(this.CronJob);
        this.reloadRule(cronJobStr);
        this.updateRule.emit(cronJobStr);
    }

    async reloadRule(cronJobStr: string) {
        let res = (await this.service.getNextScheduleDate(cronJobStr));
        this.preview = moment(res.next).fromNow()
    }
}

const parseCronJob = (job: string) => {
    const data = job.split(' ');
    let timeUnit;
    let dayOfWeek;
    let dayOfMonth;

    if (data[2] !== "*") {
        timeUnit = Times[2];
        dayOfWeek = Days[0];
        dayOfMonth = data[2];
    } else if (data[4] !== "*") {
        timeUnit = Times[1];
        dayOfWeek = Days[data[4]];
        dayOfMonth = "1";
    } else {
        timeUnit = Times[0];
        dayOfWeek = Days[0];
        dayOfMonth = "1";
    }
    const hours = `${(parseInt(data[1]) < 10) ? "0" : ""}${data[1]}`;
    const minutes = `${(parseInt(data[0]) < 10) ? "0" : ""}${data[0]}`;
    const time = `${hours}:${minutes}`;


    return {
        timeUnit: timeUnit,
        dayOfWeek: dayOfWeek,
        dayOfMonth: dayOfMonth,
        time: time
    };
}

const generateCronJob = (job: CronJobUtil): string => {
    const minute = parseInt(job.time.split(":")[1], 10);
    const hour = parseInt(job.time.split(":")[0], 10);
    const day = (job.timeUnit === Times[2]) ? job.dayOfMonth : "*";
    const dayOfWeek = (job.timeUnit === Times[1]) ? Days.indexOf(job.dayOfWeek) : "*";
    return `${minute} ${hour} ${day} * ${dayOfWeek}`;
}
