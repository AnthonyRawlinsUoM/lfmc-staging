import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryprogressComponent } from './queryprogress.component';

describe('QueryprogressComponent', () => {
  let component: QueryprogressComponent;
  let fixture: ComponentFixture<QueryprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
