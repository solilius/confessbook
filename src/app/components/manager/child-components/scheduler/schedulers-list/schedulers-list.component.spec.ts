import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulersListComponent } from './schedulers-list.component';

describe('SchedulersListComponent', () => {
  let component: SchedulersListComponent;
  let fixture: ComponentFixture<SchedulersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
