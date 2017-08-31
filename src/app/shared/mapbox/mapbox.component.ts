// Dodgy require fix : things-to-do
declare let require: any;


import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import {
  GeolocateControl,
  ScaleControl,
  NavigationControl,
  FullscreenControl,
  Map
} from 'mapbox-gl/dist/mapbox-gl.js';

var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

@Component({
  selector: 'lfmc-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  providers: [MapService]
})
export class MapboxComponent implements OnInit {

  constructor(private mapService: MapService) { }

  lat: number = -36.568;
  lng: number = 145.062;
  zoom: number = 6.5;
  bearing: number = 0;

  nav: NavigationControl;
  geo: GeolocateControl;
  scl: ScaleControl;
  ful: FullscreenControl;

  // Set bounds to Victorian Area
  bounds = [
    [139, -41],
    [151, -33]
  ];

  ngOnInit() {
    let map = new Map({
      container: 'mymapbox',
      style: 'mapbox://styles/anthonyrawlinsuom/cj5we9hex7cy82rqimwlky6rz',
      center: [this.lng, this.lat],
      zoom: this.zoom,
      hash: true,
      boxZoom: true,
      attributionControl: false,
      maxBounds: this.bounds
    });

    this.geo = new GeolocateControl();
    this.nav = new NavigationControl();
    this.scl = new ScaleControl();
    this.ful = new FullscreenControl();

    var geocoder = new MapboxGeocoder({
      accessToken: this.mapService.accessToken
    });

    map.addControl(geocoder);

    map.addControl(this.nav, 'top-left');
    map.addControl(this.geo, 'top-left');
    map.addControl(this.scl, 'bottom-left');
    map.addControl(this.ful, 'bottom-right');

    map.on('load', function() {
      map.addSource('single-point', {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      });

      map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
          "circle-radius": 5,
          "circle-color": "#A6423C"
        }
      });

      map.on('move', function(ev) {
        // alt.options.center = map.options.center;
        // alt.options.zoom = map.options.zoom;
      });

      // Listen for the `geocoder.input` event that is triggered when a user
      // makes a selection and add a symbol that matches the result.
      geocoder.on('result', function(ev) {
        map.getSource('single-point').setData(ev.result.geometry);
        this.lat = ev.result.geometry.lat;
        this.lng = ev.result.geometry.lng;
      });
    });

    this.mapService.map = map;
  }

  setSatelliteStyle() {
    this.mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');
  }

  setDatavizStyle() {
    this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl');
  }

  setDefaultStyle() {
    this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj5we9hex7cy82rqimwlky6rz');
  }
}
