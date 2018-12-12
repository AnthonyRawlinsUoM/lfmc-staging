import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelprogressComponent } from './modelprogress.component';

describe('ModelprogressComponent', () => {
  let component: ModelprogressComponent;
  let fixture: ComponentFixture<ModelprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
