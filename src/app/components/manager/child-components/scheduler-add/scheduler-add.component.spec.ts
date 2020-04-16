import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerAddComponent } from './scheduler-add.component';

describe('SchedulerAddComponent', () => {
  let component: SchedulerAddComponent;
  let fixture: ComponentFixture<SchedulerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});