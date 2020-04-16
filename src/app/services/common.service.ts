import { Injectable } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    mode: BehaviorSubject<ProgressSpinnerMode>;

    constructor() {
        this.mode = new BehaviorSubject<ProgressSpinnerMode>('determinate');
    }

    setSpinnerMode(mode: boolean) {
        this.mode.next((mode) ? 'indeterminate' : 'determinate');
    }

    getSpinnerMode(): Observable<ProgressSpinnerMode> {
        return this.mode.asObservable();
    }
}
