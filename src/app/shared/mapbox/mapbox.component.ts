import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Map } from 'mapbox-gl/dist/mapbox-gl.js';

@Component({
  selector: 'lfmc-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  providers: [ MapService ]
})
export class MapboxComponent implements OnInit {

  constructor(private mapService:MapService) { }

  lat: number = -38.6217134;
  lng: number = 143.5564043;
  zoom: number = 9;

  ngOnInit() {
    let map = new Map({
        container: 'mymapbox',
        style: 'mapbox://styles/mapbox/outdoors-v9',
        center: [this.lng, this.lat],
        zoom: this.zoom
    });
    this.mapService.map = map;
  }

}
