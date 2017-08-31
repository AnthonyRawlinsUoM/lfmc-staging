import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportjobsComponent } from './importjobs.component';

describe('ImportjobsComponent', () => {
  let component: ImportjobsComponent;
  let fixture: ComponentFixture<ImportjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
