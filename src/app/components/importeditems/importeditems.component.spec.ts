import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedItemsComponent } from './importeditems.component';

describe('ImportedItemsComponent', () => {
  let component: ImportedItemsComponent;
  let fixture: ComponentFixture<ImportedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
