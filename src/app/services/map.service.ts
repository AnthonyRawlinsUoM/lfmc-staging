import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import {Map} from 'mapbox-gl/dist/mapbox-gl.js';

@Injectable()
export class MapService {

  map:Map<any,any>;

  constructor() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o1dm81NTIwMDN6MTJxbjlvOHBiNHdlOSJ9.lt8I4sU0ceA6N8Tnnmx2ig';
  }

}
