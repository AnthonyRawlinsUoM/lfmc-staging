import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalAvailabilityComponent } from './temporal-availability.component';

describe('TemporalAvailabilityComponent', () => {
  let component: TemporalAvailabilityComponent;
  let fixture: ComponentFixture<TemporalAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
