import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionSentComponent } from './confession-sent.component';

describe('ConfessionSentComponent', () => {
  let component: ConfessionSentComponent;
  let fixture: ComponentFixture<ConfessionSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfessionSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfessionSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
