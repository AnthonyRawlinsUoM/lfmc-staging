// Dodgy require fix : things-to-do
declare let require: any;
import {EventEmitter, Component, OnInit, Input, Output, ViewChild, AfterViewInit} from '@angular/core';
import {Http} from '@angular/http';
import {MapService} from '../../services/map.service';
import {ApiService} from '../../services/api.service';
import {ChartingComponent} from '../../components/charting/charting.component';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
  GeolocateControl,
  ScaleControl,
  NavigationControl,
  FullscreenControl,
  Map, Popup
} from 'mapbox-gl/dist/mapbox-gl.js';
import * as proj4 from 'proj4/dist/proj4.js';
import * as moment from 'moment';

const bbox = require('geojson-bbox');

const now = moment().format('LLLL');

const syncMove = require('@mapbox/mapbox-gl-sync-move');
const MapboxDraw = require('@mapbox/mapbox-gl-draw');
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
const turf = require('@turf/turf');

const epsg3112 = proj4.defs('EPSG:3112', '+proj=lcc +lat_1=-18 +lat_2=-36 +lat_0=0 +lon_0=134 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
const epsg3857 = proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');
const epsg4326 = proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ');

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  providers: [MapService]
})
export class MapboxComponent implements OnInit, AfterViewInit {

  @ViewChild(ChartingComponent)
  private chartComponent: ChartingComponent;

  showtoolBar = false;
  models: any[] = [];

  // finishm = moment().format('YYYYMMDD');
  // startm = moment().subtract(30, "days").format('YYYYMMDD');

  start: Date = moment().subtract(30, 'days').toDate()
  finish: Date = moment().toDate();


  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  splitview = false;
  ingesting = false;

  @Input() cursorLat: number | string;
  @Input() cursorLng: number | string;
  @Output() cursorMoveEW;
  @Output() cursorMoveNS;

  @Output() zoomReading;
  @Output() bearingReading;

  public defaultLat = -36.568;
  public defaultLng = 145.062;

  public lat: number = this.defaultLat;
  public lng: number = this.defaultLng;

  coloroptions: any;
  colorLegend: any;

  collapse = true;
  timebrush = true;

  allModels = false;

  nav: NavigationControl;
  geo: GeolocateControl;
  scl: ScaleControl;
  ful: FullscreenControl;
  drw: any;

  splitViewHandle: any;
  aView: any;
  bView: any;

  draggingHandle = false;
  canDragSplitView = false;
  exclusiveModelMode = false;
  ingestGeoJson: string;
  isCopied = false;
  isCursorOverPoint = false;
  isDragging = false;

  map: Map;
  altmap: Map;

  // Set bounds to Australian Area
  bounds = [108, -45, 155, -10];
  canvas: any;
  coordinates: any;


  undos: any[] = [];
  redos: any[] = [];

  dragPointGeoJSON: any = {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [this.lng, this.lat]
      }
    }]
  };

  constructor(private mapService: MapService, private api: ApiService, private http: Http) {
    this.cursorMoveEW = new EventEmitter<number>();
    this.cursorMoveNS = new EventEmitter<number>();
    this.zoomReading = new EventEmitter<number>();
    this.bearingReading = new EventEmitter<number>();

    this.api.callAPI('/models').subscribe(m => this.models = m);
  }

  ngAfterViewInit() {

  }


  ngOnInit() {

    this.splitViewHandle = document.getElementById('splitViewHandle');
    this.aView = document.getElementById('backViewport');
    this.bView = document.getElementById('frontViewport');
    // this.splitViewHandle.onousemove = this.dragSplitView.bind(this);

    this.map = new Map({
      container: 'mymapbox',
      style: 'mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl',
      center: [this.lng, this.lat],
      zoom: 6.5,
      hash: true,
      boxZoom: true,
      attributionControl: false
      //   ,
      //   maxBounds: this.bounds
    });


    this.altmap = new Map({
      container: 'myAltmapbox',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [this.lng, this.lat],
      zoom: 6.5,
      hash: true,
      boxZoom: true,
      attributionControl: false
      // ,
      // maxBounds: this.bounds
    });

    // Convenience
    const altmap = this.altmap;
    const map = this.map;

    syncMove(map, altmap);


    this.geo = new GeolocateControl();
    this.nav = new NavigationControl();
    this.scl = new ScaleControl();
    this.ful = new FullscreenControl();
    this.drw = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        polygon: true,
        trash: true
      }
    });

    this.canvas = map.getCanvasContainer();
    console.log('Canvas = ', this.canvas);

    this.coordinates = document.getElementById('coordinates');

    const geocoder = new MapboxGeocoder({
      accessToken: this.mapService.accessToken
    });
    const colormap = require('colormap');

    this.coloroptions = {
      colormap: 'viridis',   // pick a builtin colormap or add your own
      nshades: 72,       // how many divisions
      format: 'hex',     // 'hex' or 'rgb' or 'rgbaString'
      alpha: 1           // set an alpha value or a linear alpha mapping [start, end]
    };
    this.colorLegend = colormap(this.coloroptions);

    map.addControl(geocoder);

    map.addControl(this.nav, 'top-right');
    map.addControl(this.geo, 'top-right');
    map.addControl(this.ful, 'top-right');
    map.addControl(this.drw, 'top-right');
    map.addControl(this.scl, 'bottom-right');

    const layers: any = [];
    const dragPointGeoJSON = this.dragPointGeoJSON;

    map.on('load', function () {

      // Extension Layers
      for (const l in layers) {
        map.addLayer(l);
      }

      map.addSource('single-point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      });
      //
      map.addLayer({
        'id': 'point',
        'source': 'single-point',
        'type': 'circle',
        'paint': {
          'circle-radius': 5,
          'circle-color': '#f19213'
        }
      });

      // Add a single point to the map
      map.addSource('draggable-point-source', {
        'type': 'geojson',
        'data': dragPointGeoJSON
      });

      map.addLayer({
        'id': 'draggable-point',
        'type': 'circle',
        'source': 'draggable-point-source',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#3887be'
          // ,
          // 'stroke-width': 2,
          // 'stroke-color': '#0264b5'
        }
      });

      // 'https://geodata.state.nj.us/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=Natural2015'

      // map.addLayer({
      //   'id': 'conservation-sites',
      //   'type': 'raster',
      //   'source': {
      //     'type': 'raster',
      //     'tiles': [
      //       'https://geodata.state.nj.us/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=Natural2015'
      //     ],
      //     'tileSize': 256
      //   },
      //   'paint': {}
      // }, 'water');

      // 25m LiDAR DEM Model from GA
      // http://services.ga.gov.au/gis/services/DEM_LiDAR_25m/MapServer/WMSServer?request=GetCapabilities&service=WMS

      // map.addSource('dem', {
      //         "type": "raster-dem",
      //         "url": "mapbox://mapbox.terrain-rgb"
      //     });
      //     map.addLayer({
      //         "id": "hillshading",
      //         "source": "dem",
      //         "type": "hillshade"
      //     // insert below waterway-river-canal-shadow;
      //     // where hillshading sits in the Mapbox Outdoors style
      //     }, 'waterway-river-canal-shadow');


      map.addLayer({
        'id': 'dead_fuel',
        'type': 'raster',
        'source': {
          'type': 'raster',
          'tiles': [
            'http://localhost:8080/geoserver/lfmc/wms?service=WMS&version=1.1.0&request=GetMap&layers=lfmc:s0_avg&styles=raster&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image%2Fpng&time=2017-01-01'],
          'tileSize': 256
        },
        'paint': {}
      }, 'water');

      map.addLayer({
        'id': 'awra',
        'type': 'raster',
        'source': {
          'type': 'raster',
          'tiles': [
            'http://localhost:8080/geoserver/lfmc/wms?service=WMS&version=1.1.0&request=GetMap&layers=lfmc:s0_avg&styles=raster&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image%2Fpng&time=2017-01-01'],
          'tileSize': 256
        },
        'paint': {}
      }, 'water');
      
      // map.addLayer({
      //     'id': 'DEM1sec', 
      //     'type': 'raster',
      //     'source': {
      //         'type':'raster',
      //         'tiles': [
      //             'http://localhost:8080/geoserver/lfmc/wms?service=WMS&version=1.1.0&request=GetMap&layers=lfmc:Image&styles=&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image%2fpng'
      //         ],
      //         'tileSize': 256
      //     },
      //     'paint': {}
      //   },
      //   'water');

      // map.addSource('cfaregion', {
      // 	'type': 'vector',
      // 	'tiles': ['http://localhost:9090/geoserver/gwc/service/wmts?request=GetTile&service=WMTS&version=1.0.0&layer=victoria:CFA_REGION&style=&tilematrix=EPSG:900913:{z}&tilematrixset=EPSG:900913&format=application/x-protobuf;type=mapbox-vector&tilecol={x}&tilerow={y}'],
      // 	'tileSize': 512
      // });
      //
      // map.addSource('cfadistrict', {
      // 	'type': 'vector',
      // 	'tiles': ['http://localhost:9090/geoserver/gwc/service/wmts?request=GetTile&service=WMTS&version=1.0.0&layer=victoria:CFA_DISTRICT&style=&tilematrix=EPSG:900913:{z}&tilematrixset=EPSG:900913&format=application/x-protobuf;type=mapbox-vector&tilecol={x}&tilerow={y}'],
      // 	'tileSize': 512
      // });
      //
      // map.addLayer({
      // 	'id': 'metadata-layer-cfa-regions',
      // 	'type': 'line',
      // 	'source': 'cfaregion',
      // 	'layout': {
      // 		// 'visibility': 'visible'
      // 	},
      // 	'paint': {
      // 		'line-color': 'hsla(20, 100%, 50%, 0.29)',
      // 		'line-width': 0.685
      // 	},
      // 	'source-layer': 'CFA_REGION'
      // });
      //
      // map.addLayer({
      // 	'id': 'metadata-layer-cfa-districts',
      // 	'type': 'line',
      // 	'source': 'cfadistrict',
      // 	'layout': {
      // 		// 'visibility': 'visible'
      // 	},
      // 	'paint': {
      // 		'line-color': 'hsla(19, 100%, 66%, 0.19)',
      // 		'line-width': 0.505
      // 	},
      // 	'source-layer': 'CFA_DISTRICT'
      // });

      map.addSource('bushfires', {
        'type': 'geojson',
        'data': 'http://api:1880/api/bushfires'
      });

      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Fireicon01.svg/100px-Fireicon01.svg.png',
        function (error, image) {
          if (error) {
            throw error;
          }
          map.addImage('fire', image);
          map.addLayer({
            'id': 'index-layer-bushfires',
            'type': 'symbol',
            'source': 'bushfires',
            'layout': {
              'icon-image': 'fire',
              'icon-size': 0.09
            }
          }, 'roads');

        });

      /**
       * Heat visible fire sources from Sentinel via GeoSciences Australia
       */
      // map.addSource('hotspots', {
      //   'type': 'geojson',
      //   // 'data': 'https://firms.modaps.eosdis.nasa.gov/wms/c6/?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=fires24&BBOX=-180,-90,180,90&&SRS=EPSG:4326'
      //   'data': 'http://sentinel.ga.gov.au/geoserver/wfs?service=wfs&version=1.1.1&request=GetFeature&typeName=public:hotspot_current_4326&outputFormat=application%2Fjson'
      // });
      
      


      // map.addLayer({
      //   'id': 'index-layer-hotspots',
      //   'type': 'circle',
      //   'source': 'hotspots',
      //   'layout': {},
      //   'paint': {
      //     'circle-color': {
      //       'property': 'temp_kelvin',
      //       'type': 'interval',
      //       'stops': [
      //         [0, '#3d05fa'],
      //         [273.15, '#5b05fa'],
      //         [285, '#8202c7'],
      //         [300, '#b8004d'],
      //         [400, '#ed3131'],
      //         [500, '#f05a11'],
      //         [600, '#f67d0c'],
      //         [700, '#ffb100'],
      //         [800, '#ffc825'],
      //         [900, '#ffd473'],
      //         [1000, '#ffe29f'],
      //         [1100, '#fff6e2']]
      //     },
      //     'circle-radius': {
      //       'base': 5,
      //       'stops': [[12, 5], [22, 180]]
      //     },
      //     'circle-opacity': {
      //       'property': 'confidence',
      //       'type': 'interval',
      //       'stops': [
      //         [0, 0.05],
      //         [20, 0.2],
      //         [40, 0.4],
      //         [60, 0.6],
      //         [80, 0.8],
      //         [100, 1.0]]
      //     }
      //   }
      // }, 'roads');


      // Listen for the `geocoder.input` event that is triggered when a user
      // makes a selection and add a symbol that matches the result.
      geocoder.on('result', function (ev) {
        map.getSource('single-point').setData(ev.result.geometry);
        this.lat = ev.result.geometry.lat;
        this.lng = ev.result.geometry.lng;
      });
    });

    const markerHeight = 10, markerRadius = 10, linearOffset = 25;
    const popupOffsets = {
      'top': [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      'bottom': [0, -markerHeight],
      'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'left': [markerRadius, (markerHeight - markerRadius) * -1],
      'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };

    // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'index-layer-bushfires', function () {
    //   map.getCanvas().style.cursor = 'pointer';
    // });

    // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'index-layer-bushfires', function () {
    //   map.getCanvas().style.cursor = '';
    // });

    // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'index-layer-hotspots', function () {
    //   map.getCanvas().style.cursor = 'pointer';
    // });

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'index-layer-hotspots', function () {
    //   map.getCanvas().style.cursor = '';
    // });

    // map.on('click', 'index-layer-bushfires', function (e) {
    //   // map.flyTo({center: e.features[0].geometry.coordinates});
    //   //
    //   // this.lat = e.features[0].geometry.coordinates.lat;
    //   // this.lng = e.features[0].geometry.coordinates.lng;
    // 
    //   new Popup({offset: popupOffsets})
    //     .setLngLat(e.features[0].geometry.coordinates)
    //     .setHTML('<strong>Incident</strong><br/>'
    //       + 'Type: ' + e.features[0].properties.incidentType + '<br/>'
    //       + 'Location: ' + e.features[0].properties.incidentLocation + '<br/>'
    //       + 'Agency: ' + e.features[0].properties.agency + '<br/>'
    //       + 'Status: ' + e.features[0].properties.originStatus + '<br/>'
    //       + 'Started:' + e.features[0].properties.originDateTime + '<br/>'
    //       + 'Updated:' + e.features[0].properties.lastUpdateDateTime + '<br/>'
    //       + 'Size:' + e.features[0].properties.incidentSize + '<br/>'
    //     ).addTo(map);
    // });


    // map.on('click', 'index-layer-hotspots', function (e) {
    //   // map.flyTo({center: e.features[0].geometry.coordinates});
    // 
    //   // this.lat = e.features[0].geometry.coordinates.lat;
    //   // this.lng = e.features[0].geometry.coordinates.lng;
    // 
    //   new Popup({offset: popupOffsets})
    //     .setLngLat(e.features[0].geometry.coordinates)
    //     .setHTML('<strong>Thermal Anomaly</strong><br/>'
    //       + 'Temp: ' + (e.features[0].properties.temp_kelvin - 273.15).toFixed(1) + '&deg;C<br/>'
    //       + 'Satellite: ' + e.features[0].properties.satellite + '<br/>'
    //       + 'Sensor: ' + e.features[0].properties.sensor + '<br/>'
    //       + 'Confidence: ' + e.features[0].properties.confidence + '<br/>'
    //       + 'Age: ' + e.features[0].properties.age_hours + ' hrs')
    //     .addTo(map);
    // });

    map.on('click', 'draggable-point', function (e) {
      map.flyTo({center: e.features[0].geometry.coordinates});
    });

    // When the cursor enters a feature in the draggable-point layer, prepare for dragging.
    map.on('mouseenter', 'draggable-point', function () {

      console.log('>>> MouseEnter on draggable point.');
      map.setPaintProperty('draggable-point', 'circle-color', '#3bb2d0');
      // this.canvas.style.cursor = 'move';
      this.isCursorOverPoint = true;
      map.dragPan.disable();
      console.log('dragPan: disabled');
    }.bind(this));

    map.on('mouseleave', 'draggable-point', function () {

      console.log('>>> MouseLeave on draggable point.');
      map.setPaintProperty('draggable-point', 'circle-color', '#3887be');
      // this.canvas.style.cursor = '';
      this.isCursorOverPoint = false;
      map.dragPan.enable();
      console.log('dragPan: enabled');
    }.bind(this));

    map.on('mousedown', this.mouseDown.bind(this));
    map.on('mousemove', this.onMove.bind(this));
    // map.on('mouseup', this.onUp.bind(this));

    this.mapService.map = map;
  }

  public toggleSplitView() {
    this.splitview = !this.splitview;
    if (!this.splitview) {
      this.bView.style.right = '100vw';
      this.splitViewHandle.style.left = '-22px';
    } else {
      this.bView.style.right = '50vw';
      this.splitViewHandle.style.left = 'calc(50vw - 22px)';
    }
  }

  enterSplitViewHandle(e: any) {
    this.splitViewHandle.style['background-color'] = 'rgb(58, 64, 74)';
    this.mapService.map.dragPan.disable();
    this.canDragSplitView = true;
    console.log('Dragging SplitView is enabled...');
  }

  leaveSplitViewHandle(e: any) {
    if (!this.draggingHandle) {
      this.splitViewHandle.style['background-color'] = 'rgb(33, 36, 42)';
      this.mapService.map.dragPan.enable();
      this.canDragSplitView = false;
      console.log('Dragging SplitView is now disabled.');
    }
  }

  downSplitView(e: any) {
    if (this.canDragSplitView) {
      this.draggingHandle = true;
      this.splitview = true;
      console.log('Dragging SplitView...');
      this.bView.style.right = 'calc(100vw - ' + e.screenX + 'px)';
      this.splitViewHandle.style.left = 'calc(' + e.screenX + 'px - 22px)';
    }
  }

  upSplitView(e: any) {
    if (this.canDragSplitView) {
      this.bView.style.right = 'calc(100vw - ' + e.screenX + 'px)';
      this.splitViewHandle.style.left = 'calc(' + e.screenX + 'px - 22px)';
      this.draggingHandle = false;
      this.canDragSplitView = false;
      console.log('Not dragging SplitView...');
      if (!this.splitview) {
        this.splitview = true;
      }
    }
    this.mapService.map.dragPan.enable();
  }

  clickSplitView(e: any) {
  }

  dragSplitView(e: any) {
    if (this.canDragSplitView && this.draggingHandle) {
      this.bView.style.right = 'calc(100vw - ' + e.screenX + 'px)';
      this.splitViewHandle.style.left = 'calc(' + e.screenX + 'px - 22px)';
    }
  }

  // use turf to save GeoJSON of boundary
  public saveBoundary() {
    const data = this.drw.getAll();
    if (data.features.length > 0) {
      console.log('Preparing GeoJSON for saving boundary locally.');
      console.log(data);
      this.setIngestValue(data);
    }
  }


  getIngestValue() {
    return JSON.parse(this.ingestGeoJson);
  }

  setIngestValue(v) {
    try {
      this.ingestGeoJson = JSON.stringify(v, null, '\t');
    } catch (e) {
      console.log('Error occured while you were typing the JSON: ' + e);
    }
  }

  public importGeoJSON() {
    if (this.ingesting) {
      console.log('Parsing GeoJSON');
      const data = this.getIngestValue();
      console.log(data);
      this.drw.set(data);
    }
  }

  public queryLFMCUsingGeoJSON() {
    console.log('Bounds call test')
    if (this.drw.getAll()) {
      console.log('Got Drawling')
      const bounds = bbox(this.drw.getAll());
      console.log('Using bounds of GeoJSON to query.');
      console.log(bounds);
      this.chartComponent.getFuelInBoundsForModels(bounds[0], bounds[3], bounds[2], bounds[1], this.getActiveModels());
    }
  }

  public makeToday() {
    this.finish = new Date(Date.now());
  }

  // Uses turf to calculate the area of the polygon in square meters
  public calculateArea() {
    const data = this.drw.getAll();
    const answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
      const area = turf.area(data);
      // restrict to area to 2 decimal points
      const rounded_area = area.toFixed(2);
      const area_km = turf.convertArea(area, 'meters', 'kilometers');
      answer.innerHTML = '<p><strong>Area of polygon:</strong> ' + rounded_area
        + ' square meters, (or ' + area_km.toFixed(2) + ' square kilometers)</p>';
      answer.style.display = 'block';
    } else {
      alert('Use the draw tools to draw a polygon!');
      answer.style.display = 'none';
    }
  }

  public setSatelliteStyle() {
    this.altmap.setStyle('mapbox://styles/mapbox/satellite-v9');
  }

  public setDatavizStyle() {
    this.altmap.setStyle('mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl');
  }

  public setDefaultStyle() {
    this.altmap.setStyle('mapbox://styles/anthonyrawlinsuom/cj5we9hex7cy82rqimwlky6rz');
  }

  private filterBy(month) {
    const filters = ['==', 'month', month];
    this.mapService.map.setFilter('incident-circles', filters);
    this.mapService.map.setFilter('incident-labels', filters);

    // Set the label to the month
    document.getElementById('month').textContent = this.months[month];
  }

  private mouseDown(e: any) {
    if (!this.isCursorOverPoint) {
      return;
    }
    console.log('>>> MouseDown on draggable point.');
    this.isDragging = true;

    // Set a cursor indicator
    // this.canvas.style.cursor = 'grab';
    this.mapService.map.dragPan.disable();
    // Mouse events
    this.mapService.map.on('mousemove', this.onDragMove.bind(this));
    this.mapService.map.once('mouseup', this.onUp.bind(this));
  }

  private onMove(e: any) {
    const coords = e.lngLat;
    this.cursorLng = coords.lng;
    this.cursorLat = coords.lat;
    this.cursorMoveEW.emit(this.cursorLng);
    this.cursorMoveNS.emit(this.cursorLat);
  }

  private onDragMove(e) {
    if (!this.isDragging) {
      return;
    }
    const coords = e.lngLat;

    console.log('>>> Dragging draggable point.');

    // Set a UI indicator for dragging.
    // this.canvas.style.cursor = 'grabbing';

    this.coordinates.style.display = 'block';
    this.coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;

    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    this.dragPointGeoJSON.features[0].geometry.coordinates = [coords.lng, coords.lat];
    this.mapService.map.getSource('draggable-point-source').setData(this.dragPointGeoJSON);

  }

  // Re-center
  public flyToDragPoint(e, undoaction: boolean = false) {
    let point;
    if (undoaction) {
      point = e;
      this.coordinates.style.display = 'block';
      this.coordinates.innerHTML = 'Longitude: ' + point.center[0] + '<br />Latitude: ' + point.center[1];

      // Update the Point feature in `geojson` coordinates
      // and call setData to the source layer `point` on it.
      this.dragPointGeoJSON.features[0].geometry.coordinates = point.center;
      this.mapService.map.getSource('draggable-point-source').setData(this.dragPointGeoJSON);
    } else {
      console.log('Flying to: ' + this.dragPointGeoJSON.features[0].geometry.coordinates);
      point = {
        center: this.dragPointGeoJSON.features[0].geometry.coordinates,
        zoom: 9
      };
    }
    this.mapService.map.flyTo(point);
    if (!undoaction) {
      this.undos.push(point);
    }
  }

  public clearHistory() {
    this.undos = [];
    this.redos = [];
  }


  // Inspect
  public repositionDragPoint() {
    this.dragPointGeoJSON.features[0].geometry.coordinates = [this.lng, this.lat];
    this.mapService.map.getSource('draggable-point-source').setData(this.dragPointGeoJSON);
    this.flyToDragPoint(null);

  }

  // State View
  public zoomToStateView(e) {
    console.log('Flying to: ' + [this.defaultLng, this.defaultLat]);

    const point = {
      center: [this.defaultLng, this.defaultLat],
      zoom: 6.5,
      bearing: 0.0,
      pitch: 0
    };
    this.mapService.map.flyTo(point);
    this.undos.push(point);
  }

  // Psuedocode: on(repositionDragPoint) {localStorage.undos += map.serialize() }
  // Stub
  // pop map.options from localStorage.undos
  // stash map.options into localStorage.redos
  public undoView() {
    if (this.undos.length > 0) {
      const prev = this.undos.pop();
      this.redos.push(prev);
      this.flyToDragPoint(prev, true);
    }
  }

  // Stub
  public redoView() {
    if (this.redos.length > 0) {
      const prev = this.redos.pop();
      this.undos.push(prev);
      this.flyToDragPoint(prev, true);
    }
  }

  public getFuelHistoryAtPoint(e: any) {
    const coords = e.lngLat;
    // This is where we trigger the API call to get Fuel Moisture Data for the
    // // ChartingComponent at the current Lat & Lng.
    // this.chartComponent.getFuelDataAtPoint(coords.lng, coords.lat);
    console.log(this.getActiveModels().toString());
    this.chartComponent.getFuelDataAtPointForModels(coords.lng, coords.lat, this.getActiveModels());

    // this.chartComponent.lat = coords.lat;

    console.log('Getting Fuel Moisture History for Longitude: ' + coords.lng + ', Latitude: ' + coords.lat);

  }

  toggleModel(m: string) {

    if (this.exclusiveModelMode) {
      for (let i = 0; i < this.models.length; i++) {
        if (this.models[i].abbr === m) {
          this.models[i].enabled = true;
        } else {
          this.models[i].enabled = false;
        }
      }
    } else {
      for (let i = 0; i < this.models.length; i++) {
        
        if (this.models[i].abbr === m) {
          this.models[i].enabled = !this.models[i].enabled;
          
        }
        
      }
    }
    this.refreshModelData();
  }

  refreshModelData() {
    this.chartComponent.getFuelDataAtPointForModels(this.lng, this.lat, this.getActiveModels());
  }


  allModelsOn() {
    this.exclusiveModelMode = false;
    this.allModels = true;
    for (let i = 0; i < this.models.length; i++) {
      this.models[i].enabled = true;
    }
    this.refreshModelData();
  }

  allModelsOff() {
    this.allModels = false;
    for (let i = 0; i < this.models.length; i++) {
      this.models[i].enabled = false;
    }
    this.refreshModelData();
  }

  private getActiveModels() {
    const active = [];
    for (let i = 0; i < this.models.length; i++) {
      this.map.setLayoutProperty(this.models[i].abbr, 'visibility', 'none');
      if (this.models[i].enabled) {
        active.push(this.models[i].abbr);
        this.map.setLayoutProperty(this.models[i].abbr, 'visibility', 'visible');
      }
    }
    return active;
  }

  private toggleTimeBrushing() {
    this.timebrush = !this.timebrush;
    this.chartComponent.timeline = !this.timebrush;
  }


  private onUp(e) {

    this.saveBoundary();

    // if(this.draggingHandle) return this.upSplitViewHandle;

    const coords = e.lngLat;
    // console.log(">>> MouseUp on draggable point.");

    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    this.coordinates.style.display = 'block';
    this.coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
    this.canvas.style.cursor = '';
    this.isDragging = false;

    this.lat = coords.lat;
    this.lng = coords.lng;

    this.flyToDragPoint(e);
    this.getFuelHistoryAtPoint(e);

    if (this.isDragging) {
      // Unbind mouse events
      this.mapService.map.off('mousemove', this.onDragMove.bind(this));
      this.mapService.map.dragPan.enable();
    }
  }
}
