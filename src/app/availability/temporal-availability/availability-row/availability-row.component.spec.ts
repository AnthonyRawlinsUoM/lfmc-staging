import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityRowComponent } from './availability-row.component';

describe('AvailabilityRowComponent', () => {
  let component: AvailabilityRowComponent;
  let fixture: ComponentFixture<AvailabilityRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
