import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelviewComponent } from './modelview.component';

describe('ModelviewComponent', () => {
  let component: ModelviewComponent;
  let fixture: ComponentFixture<ModelviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
