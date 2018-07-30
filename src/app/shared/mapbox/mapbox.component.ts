// Dodgy require fix : things-to-do
import {VideoComponent} from '../../components/video/video.component';

declare let require: any;
import {EventEmitter, Component, ElementRef, OnInit, Input, Output, ViewChild, AfterViewInit} from '@angular/core';

import {MapService} from '../../services/map.service';
import {TimeseriesService} from '../../services/timeseries.service';
import {NosqlService} from '../../services/nosql.service';
import {ChartingComponent, LFMCResponseType} from '../../components/charting/charting.component';

import {
  GeolocateControl,
  ScaleControl,
  NavigationControl,
  FullscreenControl,
  Map, Popup
} from 'mapbox-gl/dist/mapbox-gl.js';
import * as proj4 from 'proj4/dist/proj4.js';
import * as moment from 'moment';
import {ModelsService, Model, ModelMetaData, ModelOutputs, ModelParameters} from '../../services/models.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {ConfirmModal} from '../../components/confirm-modal/confirm-modal.component';
import {ImportedItemsComponent} from '../../components/importeditems/importeditems.component';

const bbox = require('geojson-bbox');

const now = moment().format('LLLL');

const syncMove = require('@mapbox/mapbox-gl-sync-move');
const MapboxDraw = require('@mapbox/mapbox-gl-draw');
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
const turf = require('@turf/turf');

const epsg3112 = proj4.defs('EPSG:3112',
  '+proj=lcc +lat_1=-18 +lat_2=-36 +lat_0=0 +lon_0=134 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
const epsg3857 = proj4.defs('EPSG:3857',
  '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');
const epsg4326 = proj4.defs('EPSG:4326',
  '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ');


@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  providers: [MapService]
})
export class MapboxComponent implements OnInit, AfterViewInit {

  @ViewChild('calculatedarea') calculatedarea: ElementRef;

  @ViewChild(ChartingComponent)
  private chartComponent: ChartingComponent;
  @ViewChild(ImportedItemsComponent)
  private importedItemsComponent: ImportedItemsComponent;
  @ViewChild(VideoComponent)
  private videoComponent: VideoComponent;


  // Boolean Hell...
  showtoolBar = false;
  showVideo = false;
  availview = false;
  splitview = false;
  ingesting = false;
  collapse = false;
  timebrush = true;
  snapping = false;
  allModels = false;

  calculated_area = '';
  model_names: any[] = [];
  models: Model[] = [];
  start: Date = moment().subtract(31, 'days').toDate();
  finish: Date = moment().subtract(1, 'days').toDate();

  selectedDate: string;

  modelA = '';
  modelB = '';

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

  availability_data = [
    {
      'model': 'AWRA',
      'series': [['2010-01-01', '2018-03-31']]
    },
    {
      'model': 'Jasmin',
      'series': [['2008-01-01', '2018-03-31']]
    },
    {
      'model': 'DEAD_FUEL',
      'series': [['2008-01-01', '2018-06-06']]
    },
    {
      'model': 'LIVE_FUEL',
      'series': [['2008-01-01', '2018-06-06']]
    },
    {
      'model': 'DF',
      'series': [['2018-05-09', '2018-05-11'],
        ['2018-05-19', '2018-06-06']]
    },
    {
      'model': 'KBDI',
      'series': [['2008-01-01', '2018-06-06']]
    },
    {
      'model': 'FFDI',
      'series': [['2018-05-09', '2018-05-11'],
        ['2018-05-19', '2018-06-06']]
    },
    {
      'model': 'Matthews',
      'series': [['2008-01-01', '2018-06-06']]
    },
    {
      'model': 'Yebra',
      'series': [['2018-01-01', '2018-06-06']]
    },
    {
      'model': 'GFDI',
      'series': [['2018-05-09', '2018-05-11'],
        ['2018-05-19', '2018-06-06']]
    },
    {
      'model': 'Temp',
      'series': [['2018-05-09', '2018-05-11'],
        ['2018-05-19', '2018-06-06']]
    }
  ];


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


  prevBoundary = {'features': []};

  nav: NavigationControl;
  geo: GeolocateControl;
  scl: ScaleControl;
  ful: FullscreenControl;
  @Input() @Output() drw: any;
  @Input() @Output() altdrw: any;

  splitViewHandle: any;
  aView: any;
  bView: any;

  draggingHandle = false;
  canDragSplitView = false;
  exclusiveModelMode = true;
  ingestGeoJson: string;
  isCopied = false;
  // isCursorOverPoint = false;
  isDragging = false;

  map: Map;
  altmap: Map;
  currentmap: Map;

  model_dimmer = true;

  // Set bounds to Australian Area
  bounds = [108, -45, 155, -10];
  default_bounds = [108, -45, 155, -10];

  canvas: any;
  coordinates: any;


  // undos: any[] = [];
  // redos: any[] = [];

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

  constructor(private mapService: MapService,
              private ns: NosqlService,
              private tss: TimeseriesService,
              private ms: ModelsService,
              private modalService: SuiModalService) {
    this.cursorMoveEW = new EventEmitter<number>();
    this.cursorMoveNS = new EventEmitter<number>();
    this.zoomReading = new EventEmitter<number>();
    this.bearingReading = new EventEmitter<number>();
    this.modalService = modalService;

    // Old System
    // this.ns.get('/model_names').subscribe(m => this.model_names = m);


  }

  getModelNamesOnly(): string[] {

    return this.models.sort((a: Model, b: Model) => {
      return a.name.localeCompare(b.name);
    }).map((m: Model) => {
      console.log(m);
      return m.ident;
    });
  }

  ngAfterViewInit() {
    this.ms.getModels().subscribe(result => {
        this.models = <Model[]>(result.models);
        this.model_names = this.getModelNamesOnly();
      },
      (e) => {
        console.log(e);
        this.modalService.open(new ConfirmModal('Error', 'While retrieving the list of models: ' + e + 'Notify webmaster?', 'tiny'))
          .onApprove(() => {
            // Notify the webmaster here...
          })
          .onDeny(() => {
            // Don't send bug reports...
          });
      },
      () => {
        this.model_dimmer = false;
      });
  }


  ngOnInit() {

    this.splitViewHandle = document.getElementById('splitViewHandle');
    this.aView = document.getElementById('backViewport');
    this.bView = document.getElementById('frontViewport');


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
      style: 'mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl',
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
    this.altdrw = new MapboxDraw({
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
    altmap.addControl(this.altdrw, 'top-right');
    map.addControl(this.scl, 'bottom-right');

    // const dragPointGeoJSON = this.dragPointGeoJSON;

    map.on('load', function () {

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

      // map.addSource('bushfires', {
      //   'type': 'geojson',
      //   'data': 'http://api:1880/api/bushfires'
      // });

      // map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Fireicon01.svg/100px-Fireicon01.svg.png',
      //   function (error, image) {
      //     if (error) {
      //       throw error;
      //     }
      //     map.addImage('fire', image);
      //     map.addLayer({
      //       'id': 'index-layer-bushfires',
      //       'type': 'symbol',
      //       'source': 'bushfires',
      //       'layout': {
      //         'icon-image': 'fire',
      //         'icon-size': 0.09
      //       }
      //     }, 'roads');
      //
      //   });

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

    // map.on('click', 'draggable-point', function (e) {
    //   map.flyTo({center: e.features[0].geometry.coordinates});
    // });

    // When the cursor enters a feature in the draggable-point layer, prepare for dragging.
    // map.on('mouseenter', 'draggable-point', function () {
    //
    //   console.log('>>> MouseEnter on draggable point.');
    //   map.setPaintProperty('draggable-point', 'circle-color', '#3bb2d0');
    //   // this.canvas.style.cursor = 'move';
    //   this.isCursorOverPoint = true;
    //   map.dragPan.disable();
    //   console.log('dragPan: disabled');
    // }.bind(this));
    //
    // map.on('mouseleave', 'draggable-point', function () {
    //
    //   console.log('>>> MouseLeave on draggable point.');
    //   map.setPaintProperty('draggable-point', 'circle-color', '#3887be');
    //   // this.canvas.style.cursor = '';
    //   this.isCursorOverPoint = false;
    //   map.dragPan.enable();
    //   console.log('dragPan: enabled');
    // }.bind(this));

    // map.on('mousedown', this.mouseDown.bind(this));
    // map.on('mousemove', this.onMove.bind(this));
    map.on('mouseup', this.onUp.bind(this));

    this.mapService.map = map;


    // Layers REST call... 'http://128.250.160.167:8080/geoserver/rest/workspaces/lfmc/layergroups.json'
  }

  public toggleSplitView() {
    this.splitview = !this.splitview;
    if (!this.splitview) {
      this.bView.style.right = '100vw';
      this.splitViewHandle.style.left = '0px';
    } else {
      this.bView.style.right = '50vw';
      this.splitViewHandle.style.left = '50vw';
    }
  }

  enterSplitViewHandle(e: any) {
    // this.splitViewHandle.style['background-color'] = 'rgb(58, 64, 74)';
    this.mapService.map.dragPan.disable();
    this.canDragSplitView = true;
    // console.log('Dragging SplitView is enabled...');
  }

  leaveSplitViewHandle(e: any) {
    if (!this.draggingHandle) {
      // this.splitViewHandle.style['background-color'] = 'rgb(33, 36, 42)';
      this.mapService.map.dragPan.enable();
      this.canDragSplitView = false;
      // console.log('Dragging SplitView is now disabled.');
    }
  }

  downSplitView(e: any) {
    if (this.canDragSplitView) {
      this.draggingHandle = true;
      this.splitview = true;
      // console.log('Dragging SplitView...');
      this.bView.style.right = 'calc(100vw - ' + e.clientX + 'px)';
      // this.splitViewHandle.style.left = 'calc(' + e.clientX + 'px - 33px)';
      this.splitViewHandle.style.left = e.clientX + 'px';
      this.splitViewHandle.style.top = e.clientY + 'px';
      this.splitViewHandle.style.opacity = '0.5';
    }
    e.stopPropagation();
  }

  upSplitView(e: any) {
    if (this.canDragSplitView) {
      this.bView.style.right = 'calc(100vw - ' + e.clientX + 'px)';
      // this.splitViewHandle.style.left = 'calc(' + e.clientX + 'px - 33px)';

      this.splitViewHandle.style.left = e.clientX + 'px';

      this.draggingHandle = false;
      this.canDragSplitView = false;
      console.log('Not dragging SplitView...');
      if (!this.splitview) {
        this.splitview = true;
      }
      this.splitViewHandle.style.opacity = '1';
      this.splitViewHandle.style.top = '0px';
    }
    this.mapService.map.dragPan.enable();
  }

  dragSplitView(e: any) {
    if (this.canDragSplitView && this.draggingHandle) {
      this.bView.style.right = 'calc(100vw - ' + e.clientX + 'px)';
      // this.splitViewHandle.style.left = 'calc(' + e.clientX + 'px - 33px)';

      this.splitViewHandle.style.left = e.clientX + 'px';
      this.splitViewHandle.style.top = e.clientY + 'px';
    }
    e.stopPropagation();
  }

  // use turf to save GeoJSON of boundary
  public saveBoundary() {
    console.log(this.prevBoundary);

    if (this.prevBoundary.features !== [] || this.prevBoundary.features.length > 0) {
      console.log('Drawing exists.');
      if (this.prevBoundary !== this.drw.getAll()) { // ie., change detected
        console.log('Change in boundary detected');
        const data = this.drw.getAll();
        if (data.features.length > 0) {
          console.log(data);
          this.setIngestValue(data);
          this.prevBoundary = data;
        } else {
          console.log('No boundary.');
        }
      }
    }

  }


  getIngestValue() {
    let json_parsed;
    try {
      json_parsed = JSON.parse(this.ingestGeoJson);
    } catch (e) {

      console.log(e);
      this.modalService
        .open(new ConfirmModal('Warning', 'JSON appears invalid: ' + e, 'tiny'))
        .onApprove(() => alert('NYI'))
        .onDeny(() => {
        });
    }
    return json_parsed;
  }

  setIngestValue(v) {
    try {
      this.ingestGeoJson = JSON.stringify(v, null, '\t');
      console.log('Boundary updated.');

    } catch (e) {
      console.log('Error setting ingest JSON:' + e);
      this.modalService
        .open(new ConfirmModal('Warning', 'JSON appears invalid: ' + e, 'tiny'))
        .onApprove(() => alert('NYI'))
        .onDeny(() => {
        });
    }
  }

  public importGeoJSON() {

    console.log('Parsing GeoJSON');
    const data = this.getIngestValue();
    console.log(data);
    this.drw.set(data);
    this.altdrw.set(data); // Mirror the data on the alternate view!
    this.zoomToBoundaryView();

  }

  public zoomToBoundaryView() {
    if (this.drw.getAll()) {
      const buffered = turf.buffer(this.drw.getAll(), 1); // Default units is kilometers
      const bboxDraw = turf.bbox(buffered);
      this.mapService.map.fitBounds(bboxDraw);
    }
  }

  public weekView() {
    this.start = moment().subtract(8, 'days').toDate();
    this.finish = moment().subtract(1, 'days').toDate();

    this.updateDatetimeOnWMTSSources();
  }


  // Uses turf to calculate the area of the polygon in square meters
  public calculateArea() {
    const data = this.drw.getAll();
    if (data.features.length > 0) {
      const area = turf.area(data);
      // restrict to area to 2 decimal points
      const rounded_area = area.toFixed(2);
      const area_km = turf.convertArea(area, 'meters', 'kilometers');
      this.calculated_area = 'Area of all polygons: ' + rounded_area
        + ' square meters, (or ' + area_km.toFixed(2) + ' square kilometers)';

      this.modalService
        .open(new ConfirmModal('Information', this.calculated_area, 'tiny'))
        .onApprove(() => {
          this.calculated_area = '';
        })
        .onDeny(() => {
        });

    } else {

      this.modalService
        .open(new ConfirmModal('Warning', 'Use the draw tools to draw a polygon!', 'tiny'))
        .onApprove(() => {
        })
        .onDeny(() => {
        });

    }
  }

  // State View
  // public zoomToStateView(e) {
  //   // console.log('Flying to: ' + [this.defaultLng, this.defaultLat]);
  //
  //   const point = {
  //     center: [this.defaultLng, this.defaultLat],
  //     zoom: 6.5,
  //     bearing: 0.0,
  //     pitch: 0
  //   };
  //   // this.mapService.map.flyTo(point);
  //   this.undos.push(point);
  // }

  public mpg() {
    if (this.drw.getAll()) {
      this.showVideo = true;
      const json_query = {
        'geo_json': this.drw.getAll(),
        'start': this.start.toDateString(),
        'finish': this.finish.toDateString(),
        'models': this.getActiveModels('R'),
        'response_as': LFMCResponseType.MP4
      };
      this.videoComponent.getVideo(json_query);
    }
  }

  toggleModel(m: string, LRO: string) {
    switch (LRO) {
      case 'L':
        for (let i = 0; i < this.models.length; i++) {
          if (this.models[i].code === m) {
            this.models[i].enabled_left = !this.models[i].enabled_left;
            this.models[i].enabled_right = false;
            this.modelA = m;
          }
        }
        break;
      case 'R':
        for (let i = 0; i < this.models.length; i++) {
          if (this.models[i].code === m) {
            this.models[i].enabled_right = !this.models[i].enabled_right;
            this.models[i].enabled_left = false;
            this.modelB = m;
          }
        }
        break;
      case 'O':
        for (let i = 0; i < this.models.length; i++) {
          if (this.models[i].code === m) {
            this.models[i].enabled_left = false;
            this.models[i].enabled_right = false;
          }
        }
        break;
    }
    this.getActiveModels('R'); // <- or LEFT doesn't matter. Just calling refresh
  }

  public refreshModelData() {

    console.log('>>> Refreshing Model Data...');

    const active = this.getActiveModels('R');
    const gj = this.drw.getAll();

    if ((!((gj.features).length > 0)) || (active.length === 0)) {
      if (!((gj.features).length > 0)) {
        this.modalService
          .open(new ConfirmModal('Warning', 'Please create or import a boundary in the SPACE Panel, or draw a region using the tools.', 'tiny'))
          .onApprove(() => {
          })
          .onDeny(() => {
          });
      } else if (active.length === 0) {
        this.modalService
          .open(new ConfirmModal('Warning', 'Please select some models from the TIME Panel to compare.', 'tiny'))
          .onApprove(() => {
          })
          .onDeny(() => {
          });
      }
    } else {
      console.log('>>> Getting Query Results...');
      this.chartComponent.dimmer = true;
      this.chartComponent.getFuelForShapeWithModels(
        gj,
        this.start.toDateString(),
        this.finish.toDateString(),
        this.getActiveModels('Both'),
        LFMCResponseType.TIMESERIES
      );
    }
  }


  private toggleTimeBrushing() {
    this.timebrush = !this.timebrush;
    this.chartComponent.timeline = !this.timebrush;
  }

  private onUp(e) {
    console.log('Got onUp');
    this.saveBoundary();

    // if(this.draggingHandle) return this.upSplitViewHandle;

    // const coords = e.lngLat;
    // console.log(">>> MouseUp on draggable point.");

    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    // this.coordinates.style.display = 'block';
    // this.coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
    this.canvas.style.cursor = '';
    this.isDragging = false;

    // this.lat = coords.lat;
    // this.lng = coords.lng;

    // this.flyToDragPoint(e);

    // if (this.isDragging) {
    //   // Unbind mouse events
    //   this.mapService.map.off('mousemove', this.onDragMove.bind(this));
    //   this.mapService.map.dragPan.enable();
    // }
  }

  ownAllByRight() {
    this.exclusiveModelMode = false;
    this.allModels = true;
    for (let i = 0; i < this.models.length; i++) {
      this.models[i].enabled_left = false;
      this.models[i].enabled_right = true;
    }
  }

  ownAllByLeft() {
    this.allModels = false;
    for (let i = 0; i < this.models.length; i++) {
      this.models[i].enabled_left = true;
      this.models[i].enabled_right = false;
    }
  }

  private getActiveModels(L_or_R_or_Both) {
    const R = [];
    const L = [];
    for (let i = 0; i < this.models.length; i++) {
      if (this.models[i].enabled_right) {
        this.models[i].enabled_left = false;
        R.push(this.models[i].code);
        this.ownLayerRight(this.models[i].code);
      } else if (this.models[i].enabled_left) {
        this.models[i].enabled_right = false;
        L.push(this.models[i].code);
        this.ownLayerLeft(this.models[i].code);
      } else {
        this.layerOff(this.models[i].code);
      }
    }
    console.log('Models on Left:' + L);
    console.log('Models on Right:' + R);

    this.modelA = L.toString().replace(',', ', ');
    this.modelB = R.toString().replace(',', ', ');


    // Show time-series for left, right, or both?
    if (L_or_R_or_Both === 'R') {
      return R;
    }
    if (L_or_R_or_Both === 'L') {
      return L;
    }
    if (L_or_R_or_Both === 'Both') {
      return L.concat(R);
    }
  }

  date_range(startDate, stopDate) {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stop = moment(stopDate);
    while (currentDate <= stop) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  makeSourceForModel(layer_code) {


    const layer_url_part_A = 'http://geoserver.landscapefuelmoisture.bushfirebehaviour.net.au/geoserver/lfmc/wms?service=WMS&version=1.3.0&request=GetMap&layers=lfmc:';
    const layer_url_part_B = '&styles=&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857';

    let time_component;

    if (this.selectedDate !== undefined) {
      time_component = '&time=' + moment(this.selectedDate).format('YYYY-MM-DD');
    } else {
      time_component = '&time=' + moment(this.start).format('YYYY-MM-DD');
    }
    // It is possible to animate the map using the WMS Animator function of GeoServer,
    // however Mapbox doesn't support rendering because you can't sync animation frames
    // const anim_component = '/' + moment(this.finish).format('YYYY-MM-DD') + '&format=image/gif;subtype=animated&aparam=time&avalues=' +
    // this.date_range(this.start, this.finish);
    const anim_component = '&format=image%2fpng&transparent=true';

    const layer_source = {
      'type': 'raster',
      'tiles': [layer_url_part_A + layer_code.toUpperCase() + layer_url_part_B + anim_component + time_component],
      'tileSize': 256
    };

    if (this.currentmap.getLayer(layer_code)) {
      try {
        this.currentmap.removeLayer(layer_code);
      } catch (e) {
        console.log('OK that the layer doesn\'t exist yet.');
      }
    }
    if (this.currentmap.getSource(layer_code + '_source')) {
      try {
        this.currentmap.removeSource(layer_code + '_source');
      } catch (e) {
        console.log('OK that source doesn\'t exist yet.');
      }
    }
    this.currentmap.addSource(layer_code + '_source', layer_source);
    console.log('Added ' + layer_code + '_source.');
  }

  addLayersForAllModels() {
    ['L', 'R'].forEach((lr) => {
      this.setMapContext(lr);
      for (let i = 0; i < this.models.length; i++) {
        const layer_code = this.models[i].code;
        this.makeSourceForModel(layer_code);
        this.makeLayerForModel(layer_code);
      }
    });
    this.setMapContext('R');
  }

  makeLayerForModel(layer_code) {
    if (!(this.currentmap instanceof Map)) {
      console.log('Current map not set.');
    } else {


      if (this.currentmap.getLayer(layer_code)) {
        try {
          this.currentmap.removeLayer(layer_code);
        } catch (e) {
          console.log('OK that the layer doesn\'t exist yet.');
        }
      }
      if (this.currentmap.getSource(layer_code + '_source')) {
        try {
          this.currentmap.removeSource(layer_code + '_source');
        } catch (e) {
          console.log('OK that the source doesn\'t exist yet.');
        }
        this.makeSourceForModel(layer_code);
      }
      this.currentmap.addLayer({
        'id': layer_code,
        'type': 'raster',
        'source': layer_code + '_source',
        'paint': {}
      }, 'water');
    }
  }

  shuntFuture() {
    this.start = moment(this.start).add(1, 'day').toDate();
    this.finish = moment(this.finish).add(1, 'day').toDate();
  }

  shuntPast() {
    this.start = moment(this.start).subtract(1, 'day').toDate();
    this.finish = moment(this.finish).subtract(1, 'day').toDate();
  }

  shuntFutureWeek() {
    const diff = this.durationWindow();

    this.start = moment(this.start).add(diff, 'day').toDate();
    this.finish = moment(this.finish).add(diff, 'day').toDate();
  }

  shuntPastWeek() {

    const diff = this.durationWindow();

    this.start = moment(this.start).subtract(diff, 'day').toDate();
    this.finish = moment(this.finish).subtract(diff, 'day').toDate();
  }

  reducePast() {
    this.start = moment(this.start).add(1, 'day').toDate();
  }

  reduceFuture() {
    this.finish = moment(this.finish).subtract(1, 'day').toDate();
  }

  extendFuture() {
    this.finish = moment(this.finish).add(1, 'day').toDate();
  }

  extendPast() {
    this.start = moment(this.start).subtract(1, 'day').toDate();
  }

  durationWindow() {
    return moment(this.finish).diff(moment(this.start), 'day');
  }

  onSelectDate(e) {
    this.selectedDate = moment(e.name).format('YYYY-MM-DD');
    console.log('Got new date Selection: ', this.selectedDate);
    this.updateDatetimeOnWMTSSources();
  }

  updateDatetimeOnWMTSSources() {

    console.log('Start is: ', this.start.toDateString());
    console.log('Finish is: ', this.finish.toDateString());


    ['L', 'R'].forEach((lr) => {
      this.setMapContext(lr);
      for (let i = 0; i < this.models.length; i++) {
        const layer_code = this.models[i].code;
        this.makeSourceForModel(layer_code);
        if ((this.models[i].enabled_left && lr === 'L') || (this.models[i].enabled_right && lr === 'R')) {
          this.makeLayerForModel(layer_code);
        }
      }
    });
  }

  layerOff(layer_code) {
    if (this.altmap.getLayer(layer_code)) {
      try {
        this.altmap.removeLayer(layer_code);
      } catch (e) {
        console.log('OK that the layer doesn\'t exist yet.');
      }
    }
    if (this.map.getLayer(layer_code)) {
      try {
        this.map.removeLayer(layer_code);
      } catch (e) {
        console.log('OK that the layer doesn\'t exist yet.');
      }
    }
  }

  ownLayerRight(layer_code) {
    if (!this.map.getSource(layer_code + '_source')) {
      this.setMapContext('R');
      this.makeSourceForModel(layer_code);
    }
    if (!this.map.getLayer(layer_code)) {
      this.map.addLayer({
        'id': layer_code,
        'type': 'raster',
        'source': layer_code + '_source',
        'paint': {}
      }, 'water');
    }
    if (this.altmap.getLayer(layer_code)) {
      try {
        this.altmap.removeLayer(layer_code);
      } catch (e) {
        console.log('OK that the layer doesn\'t exist yet.');
      }
    }
  }

  ownLayerLeft(layer_code) {
    if (!this.altmap.getSource(layer_code + '_source')) {
      this.setMapContext('L');
      this.makeSourceForModel(layer_code);
    }
    if (!this.altmap.getLayer(layer_code)) {
      this.altmap.addLayer({
        'id': layer_code,
        'type': 'raster',
        'source': layer_code + '_source',
        'paint': {}
      }, 'water');
    }
    if (this.map.getLayer(layer_code)) {
      try {
        this.map.removeLayer(layer_code);
      } catch (e) {
        console.log('OK that the layer doesn\'t exist yet.');
      }
    }
  }

  setMapContext(L_or_R) {
    if (L_or_R === 'R') {
      this.currentmap = this.map;
    }
    if (L_or_R === 'L') {
      this.currentmap = this.altmap;
    }
    console.log(this.currentmap);
  }

  toggleAvailabilityView() {
    this.availview = !this.availview;
  }

  refreshAvailability() {

    // Just sort the static dummy data as a proxy to the real thing for now...
    return this.availability_data.sort((a, b) => {
      if (a.model > b.model) {
        return 1;
      }
      if (a.model < b.model) {
        return -1;
      }
      return 0;
    });
  }
}
