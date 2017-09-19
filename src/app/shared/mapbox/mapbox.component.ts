// Dodgy require fix : things-to-do
declare let require: any;
import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { MapService } from '../../services/map.service';
import { DatasourcesService } from '../../services/datasources.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
	GeolocateControl,
	ScaleControl,
	NavigationControl,
	FullscreenControl,
	Map, Popup
} from 'mapbox-gl/dist/mapbox-gl.js';

var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

@Component({
	selector: 'lfmc-mapbox',
	templateUrl: './mapbox.component.html',
	styleUrls: ['./mapbox.component.css'],
	providers: [MapService]
})
export class MapboxComponent implements OnInit {

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

	@Input() cursorLat: number | string;
	@Input() cursorLng: number | string;
	@Output() cursorMoveEW;
	@Output() cursorMoveNS;

	@Output() zoomReading;
	@Output() bearingReading;

	constructor(private mapService: MapService, private datasourcesService: DatasourcesService) {
		this.cursorMoveEW = new EventEmitter<number>();
		this.cursorMoveNS = new EventEmitter<number>();

		this.zoomReading = new EventEmitter<number>();
		this.bearingReading = new EventEmitter<number>();
	}

	public lat: number = -36.568;
	public lng: number = 145.062;

	coloroptions: any;
	colorLegend: any;

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
			style: 'mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl',
			center: [this.lng, this.lat],
			zoom: 6.5,
			hash: true,
			boxZoom: true,
			attributionControl: false
			// ,
			// maxBounds: this.bounds
		});

		this.geo = new GeolocateControl();
		this.nav = new NavigationControl();
		this.scl = new ScaleControl();
		this.ful = new FullscreenControl();

		var geocoder = new MapboxGeocoder({
			accessToken: this.mapService.accessToken
		});
		var colormap = require('colormap');

		this.coloroptions = {
			colormap: 'viridis',   // pick a builtin colormap or add your own
			nshades: 72,       // how many divisions
			format: 'hex',     // "hex" or "rgb" or "rgbaString"
			alpha: 1           // set an alpha value or a linear alpha mapping [start, end]
		}
		this.colorLegend = colormap(this.coloroptions);

		map.addControl(geocoder);

		map.addControl(this.nav, 'top-right');
		map.addControl(this.geo, 'top-right');
		map.addControl(this.ful, 'top-right');
		map.addControl(this.scl, 'top-left');

		map.on('mousemove', (e) => {
			this.cursorLng = (e.lngLat.toArray())[0];
			this.cursorLat = (e.lngLat.toArray())[1];
			// console.log("{" + this.cursorLng + "," + this.cursorLat + "}");

			this.cursorMoveEW.emit(this.cursorLng);
			this.cursorMoveNS.emit(this.cursorLat);
			// console.log(JSON.stringify(e.lngLat));
			// this.bearingReading.emit(this.nav.getBearing());
			// this.zoomReading.emit(this.nav.getZoom());
		});

		var layers:any = [];
		var sources:any = [];



		map.on('load', function() {


			// Extension Layers
			for (var l in layers) {
				map.addLayer(l);
			}


			map.addSource('single-point', {
				"type": "geojson",
				"data": {
					"type": "FeatureCollection",
					"features": []
				}
			});
			//
			map.addLayer({
				"id": "point",
				"source": "single-point",
				"type": "circle",
				"paint": {
					"circle-radius": 5,
					"circle-color": "#f19213"
				}
			});



















			map.addSource('cfastations', {
				'type': 'geojson',
				'data': 'http://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&WIDTH=512&HEIGHT=512&LAYERS=VMFEAT_CFA_FIRE_STATION&STYLES=&FORMAT=image%2Fpng&SRS=EPSG%3A4283&BBOX=140.501%2C-39.137%2C150.068%2C-33.0'
			});

			map.addSource('cfaregion', {
				'type': 'vector',
				'tiles': ['http://localhost:8080/geoserver/gwc/service/wmts?request=GetTile&service=WMTS&version=1.0.0&layer=victoria:CFA_REGION&style=&tilematrix=EPSG:900913:{z}&tilematrixset=EPSG:900913&format=application/x-protobuf;type=mapbox-vector&tilecol={x}&tilerow={y}'],
				'tileSize': 512
			});

			map.addSource('cfadistrict', {
				'type': 'vector',
				'tiles': ['http://localhost:8080/geoserver/gwc/service/wmts?request=GetTile&service=WMTS&version=1.0.0&layer=victoria:CFA_DISTRICT&style=&tilematrix=EPSG:900913:{z}&tilematrixset=EPSG:900913&format=application/x-protobuf;type=mapbox-vector&tilecol={x}&tilerow={y}'],
				'tileSize': 512
			});

			map.addSource('kbdi', {
				'type': 'raster',
				'tiles': [
					'http://localhost:8080/geoserver/victoria/wms?service=WMS&version=1.1.0&request=GetMap&layers=victoria:KBDI_SFC&styles=&bbox=140.8879867553711,-39.76999832100885,151.05409088134766,-33.929998627233346&width=768&height=441&srs=EPSG:4326&format=image%2Fpng'
				],
				'tileSize': 256
			});

			map.addSource('windDirection', {
				'type': 'raster',
				'tiles': [
					'http://localhost:8080/geoserver/victoria/wms?service=WMS&version=1.1.0&request=GetMap&layers=victoria:victoria:Wind_Dir_SFC&styles=&bbox=140.8879867553711,-39.76999832100885,151.05409088134766,-33.929998627233346&width=768&height=441&srs=EPSG:4326&format=image%2Fpng'
				],
				'tileSize': 256
			});


			map.addLayer({
				'id': 'metadata-layer-cfa-regions',
				'type': 'line',
				'source': 'cfaregion',
				'layout': {
					// 'visibility': 'visible'
				},
				'paint': {
					'line-color': 'hsla(20, 100%, 50%, 0.29)',
					'line-width': 0.685
				},
				'source-layer': 'CFA_REGION'
			});

			map.addLayer({
				'id': 'metadata-layer-cfa-districts',
				'type': 'line',
				'source': 'cfadistrict',
				'layout': {
					// 'visibility': 'visible'
				},
				'paint': {
					'line-color': 'hsla(19, 100%, 66%, 0.19)',
					'line-width': 0.505
				},
				'source-layer': 'CFA_DISTRICT'
			});


			map.addLayer({
				'id': 'metadata-layer-cfa-stations',
				'type': 'circle',
				'source': 'cfastations',
				'layout': {},
				'paint': {
					'circle-color': '#777472',
					'circle-radius': 3.53
				},
				'source-layer': 'CFA_DISTRICT'
			});


			map.addLayer({
				'id': 'index-layer-windDirection',
				'type': 'raster',
				'source': {
					'type': 'raster',
					'tiles': [
						'http://localhost:8080/geoserver/victoria/wms?service=WMS&version=1.1.0&request=GetMap&layers=victoria:Wind_Dir_SFC&styles=&bbox=140.8879867553711,-39.76999832100885,151.05409088134766,-33.929998627233346&width=768&height=441&srs=EPSG:4326&format=image%2Fpng%3B%20mode%3D8bit'
					],
					'tileSize': 256
				},
				'paint': {},
			}, 'water');



			map.addSource('bushfires', {
				'type': 'geojson',
				'data': 'http://localhost:1880/bushfires'
			});

			// var data = this.http.get('http://localhost:1880/bushfires')
			// 	.map((res: Response) => res.json())
			// 	.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
			//
			// map.getSource('bushfires').setData(data);

			map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Fireicon01.svg/100px-Fireicon01.svg.png', function(error, image) {
				if (error) throw error;
				map.addImage('fire', image);
				map.addLayer({
					'id': 'index-layer-bushfires',
					'type': 'symbol',
					'source': 'bushfires',
					// 'source-layer':'hotspot_current_4326',
					'layout': {
						'icon-image': 'fire',
						// 'icon-color': {
						// 	'property': 'age_hours',
						// 	'type': 'interval',
						// 	'stops': [
						// 		[2, '#f7e184'],
						// 		[6, '#fbb03b'],
						// 		[24, '#e8761a'],
						// 		[48, '#ed3131'],
						// 		[72, '#cccccc']]
						// },
						'icon-size': 0.09
					}
				}, 'roads');

			});

			/**
			 * Heat visible fire sources from Sentinel via GeoSciences Australia
			 */
			map.addSource('hotspots', {
				'type': 'geojson',
				// 'data': 'https://firms.modaps.eosdis.nasa.gov/wms/c6/?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=fires24&BBOX=-180,-90,180,90&&SRS=EPSG:4326'
				'data': 'http://sentinel.ga.gov.au/geoserver/wfs?service=wfs&version=1.1.1&request=GetFeature&typeName=public:hotspot_current_4326&outputFormat=application%2Fjson'
			});


			map.addLayer({
				'id': 'index-layer-hotspots',
				'type': 'circle',
				'source': 'hotspots',
				'layout': {},
				'paint': {
					'circle-color': {
						'property': 'temp_kelvin',
						'type': 'interval',
						'stops': [
							[0, '#3d05fa'],
							[273.15, '#5b05fa'],
							[285, '#8202c7'],
							[300, '#b8004d'],
							[400, '#ed3131'],
							[500, '#f05a11'],
							[600, '#f67d0c'],
							[700, '#ffb100'],
							[800, '#ffc825'],
							[900, '#ffd473'],
							[1000, '#ffe29f'],
							[1100, '#fff6e2']]
					},
					'circle-radius': {
						'base': 5,
						'stops': [[12, 5], [22, 180]]
					},
					'circle-opacity': {
						'property': 'confidence',
						'type': 'interval',
						'stops': [
							[0, 0.05],
							[20, 0.2],
							[40, 0.4],
							[60, 0.6],
							[80, 0.8],
							[100, 1.0]]
					}
				}
			}, 'roads');


			//this.filterBy(0);

			// document.getElementById('slider').addEventListener('input', function(e) {
			// 	var month = parseInt(e.target.value, 10);
			// 	this.filterBy(month);
			// });

			// map.addLayer({
			// 	'id': 'metadata-layer-cfa-stations',
			// 	'type': 'point',
			// 	'source': 'cfa',
			// 	'layout': {
			// 		// 'visibility': 'visible'
			// 	},
			// 	'paint': {
			// 		'line-color': '#f50',
			// 		'line-width': 0.655
			// 	},
			// 	'source-layer': 'CFA_STATIONS'
			// });

			// Listen for the `geocoder.input` event that is triggered when a user
			// makes a selection and add a symbol that matches the result.
			geocoder.on('result', function(ev) {
				map.getSource('single-point').setData(ev.result.geometry);
				this.lat = ev.result.geometry.lat;
				this.lng = ev.result.geometry.lng;
			});
		});

		var markerHeight = 10, markerRadius = 10, linearOffset = 25;
		var popupOffsets = {
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
		map.on('mouseenter', 'index-layer-bushfires', function() {
			map.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'index-layer-bushfires', function() {
			map.getCanvas().style.cursor = '';
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on('mouseenter', 'index-layer-hotspots', function() {
			map.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'index-layer-hotspots', function() {
			map.getCanvas().style.cursor = '';
		});

		map.on('click', 'index-layer-bushfires', function(e) {
			new Popup({ offset: popupOffsets })
				.setLngLat(e.features[0].geometry.coordinates)
				.setHTML("<strong>Incident</strong><br/>"
				+ "Type: " + e.features[0].properties.incidentType + "<br/>"
				+ "Location: " + e.features[0].properties.incidentLocation + "<br/>"
				+ "Agency: " + e.features[0].properties.agency + "<br/>"
				+ "Status: " + e.features[0].properties.originStatus + "<br/>")
				.addTo(map);
		});

		map.on('click', 'index-layer-hotspots', function(e) {
			new Popup({ offset: popupOffsets })
				.setLngLat(e.features[0].geometry.coordinates)
				.setHTML("<strong>Thermal Anomaly</strong><br/>"
				+ "Temp: " + (e.features[0].properties.temp_kelvin - 273.15).toFixed(1) + "&deg;C<br/>"
				+ "Satellite: " + e.features[0].properties.satellite + "<br/>"
				+ "Sensor: " + e.features[0].properties.sensor + "<br/>"
				+ "Confidence: " + e.features[0].properties.confidence)
				.addTo(map);
		});

		this.mapService.map = map;
	}

	public setSatelliteStyle() {
		this.mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');
	}

	public setDatavizStyle() {
		this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl');
	}

	public setDefaultStyle() {
		this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj5we9hex7cy82rqimwlky6rz');
	}

	private filterBy(month) {
		var filters = ['==', 'month', month];
		this.mapService.map.setFilter('incident-circles', filters);
		this.mapService.map.setFilter('incident-labels', filters);

		// Set the label to the month
		document.getElementById('month').textContent = this.months[month];
	}
}
