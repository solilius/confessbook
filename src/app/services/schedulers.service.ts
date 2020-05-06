import { Injectable } from '@angular/core';
import { Scheduler } from '../models/scheduler/scheduler.module';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class SchedulersService {
    private baseUrl: string;
    private schedulers: Scheduler[];
    constructor(private service: CommonService) {
        this.baseUrl = `${environment.server}/schedulers`;
    }

    async getSchedulers() {
        if (!this.schedulers) {
            this.schedulers = await this.service.request('get', this.baseUrl);
        }
        return Promise.resolve(this.schedulers);
    }

    createScheduler(scheduler: Scheduler): Promise<any> {
        return this.service.request('post', this.baseUrl, scheduler);
    }

    updateScheduler(scheduler: Scheduler): Promise<Scheduler> {
        return this.service.request('put', `${this.baseUrl}/${scheduler._id}`, scheduler);

    }

    activateScheduler(id: string, active: Boolean): Promise<any> {
        return this.service.request('patch', `${this.baseUrl}/${id}?active=${active}`);

    }

    deleteScheduler(id: string): Promise<any> {
        this.schedulers = this.schedulers.filter(s => s._id !== id);
        return this.service.request('delete', `${this.baseUrl}/${id}?user=${localStorage.getItem('username')}`);
    }

    getNextScheduleDate(rule: string): Promise<any> {
        return this.service.request('get', `${this.baseUrl}/next/${rule}`);
    }
}
