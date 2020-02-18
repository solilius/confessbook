import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfessionComponent } from './new-confession.component';

describe('NewConfessionComponent', () => {
  let component: NewConfessionComponent;
  let fixture: ComponentFixture<NewConfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
