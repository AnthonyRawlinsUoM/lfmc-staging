import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PersistenceService, StorageType } from 'angular-persistence';

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// mapboxgl.accessToken = "";
// const MapGL = mapboxgl.Map;

@Component({
  selector: 'lfmc-basic-map',
  templateUrl: './basic-map.component.html',
  styleUrls: ['./basic-map.component.css']
})
export class BasicMapComponent implements OnInit {

  // defaults
  lat: number = -38.6217134;
  lng:number = 143.5564043;
  zoom:number = 2;

  private mapPrefs: PersistenceService;

  // mapbox: mapboxgl.MapGL;

  constructor(private storage: PersistenceService) {
    this.mapPrefs = this.storage;
  }

  ngOnInit() {
    if(this.mapPrefs.get('test')) console.log('works!');

    this.mapPrefs.set('lat', this.lat, {type: StorageType.SESSION});
    this.mapPrefs.set('lng', this.lng, {type: StorageType.SESSION});
    this.mapPrefs.set('zoom', this.zoom, {type: StorageType.SESSION});
  }

}
