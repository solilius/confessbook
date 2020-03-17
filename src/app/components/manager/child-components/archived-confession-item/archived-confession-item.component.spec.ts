import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedConfessionItemComponent } from './archived-confession-item.component';

describe('ArchivedConfessionItemComponent', () => {
  let component: ArchivedConfessionItemComponent;
  let fixture: ComponentFixture<ArchivedConfessionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedConfessionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedConfessionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
