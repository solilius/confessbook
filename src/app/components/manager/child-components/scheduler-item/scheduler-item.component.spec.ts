import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerItemComponent } from './scheduler-item.component';

describe('SchedulerItemComponent', () => {
  let component: SchedulerItemComponent;
  let fixture: ComponentFixture<SchedulerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
