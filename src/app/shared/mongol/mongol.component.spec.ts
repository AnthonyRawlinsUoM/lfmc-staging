import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MongolComponent } from './mongol.component';

describe('MongolComponent', () => {
  let component: MongolComponent;
  let fixture: ComponentFixture<MongolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MongolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MongolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
