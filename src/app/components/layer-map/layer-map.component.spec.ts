import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerMapComponent } from './layer-map.component';

describe('LayerMapComponent', () => {
  let component: LayerMapComponent;
  let fixture: ComponentFixture<LayerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
