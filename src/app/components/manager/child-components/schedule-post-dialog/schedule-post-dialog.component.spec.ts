import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePostDialogComponent } from './schedule-post-dialog.component';

describe('SchedulePostDialogComponent', () => {
  let component: SchedulePostDialogComponent;
  let fixture: ComponentFixture<SchedulePostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePostDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
