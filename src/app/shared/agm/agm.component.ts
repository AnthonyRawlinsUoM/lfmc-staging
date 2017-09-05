import { Component, OnInit } from '@angular/core';
import { PolygonManager, KmlLayerManager, DataLayerManager } from '@agm/core';

@Component({
  selector: 'lfmc-agm',
  templateUrl: './agm.component.html',
  styleUrls: ['./agm.component.css']
})
export class AgmComponent implements OnInit {

  public lat: number = -36.568;
  public lng: number = 145.062;
  public zoom: number = 6.5;

  constructor() {
    
  }

  ngOnInit() {
  }

}
