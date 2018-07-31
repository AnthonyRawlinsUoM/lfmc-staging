import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesaverComponent } from './filesaver.component';

describe('FilesaverComponent', () => {
  let component: FilesaverComponent;
  let fixture: ComponentFixture<FilesaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
