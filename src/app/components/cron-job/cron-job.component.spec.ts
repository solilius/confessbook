import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronJobComponent } from './cron-job.component';

describe('CronJobComponent', () => {
  let component: CronJobComponent;
  let fixture: ComponentFixture<CronJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
