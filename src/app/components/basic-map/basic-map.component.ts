import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

  // mapbox: mapboxgl.MapGL;

  constructor() {
    // this.mapbox = new MapGL({
    //   container: 'mapboxgl',
    //   style: 'mapbox://styles/mapbox/outdoors',
    //   center: [this.lat, this.lng],
    //   zoom: 9
    // });
  }

  ngOnInit() {
  }

}
