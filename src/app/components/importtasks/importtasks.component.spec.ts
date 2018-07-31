import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporttasksComponent } from './importtasks.component';

describe('ImporttasksComponent', () => {
  let component: ImporttasksComponent;
  let fixture: ComponentFixture<ImporttasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporttasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporttasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
