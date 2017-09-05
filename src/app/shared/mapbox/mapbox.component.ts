// Dodgy require fix : things-to-do
declare let require: any;
import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
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


	@Input() cursorLat: number | string;
	@Input() cursorLng: number | string;
	@Output() cursorMoveEW;
	@Output() cursorMoveNS;

	constructor(private mapService: MapService) {
		this.cursorMoveEW = new EventEmitter<number>();
		this.cursorMoveNS = new EventEmitter<number>();
	}

	public lat: number = -36.568;
	public lng: number = 145.062;
	public zoom: number = 6.5;
	public bearing: number = 0;


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
			attributionControl: false
			,
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

		map.on('mousemove', (e) => {
			this.cursorLng = (e.lngLat.toArray())[0];
			this.cursorLat = (e.lngLat.toArray())[1];
			// console.log("{" + this.cursorLng + "," + this.cursorLat + "}");

			this.cursorMoveEW.emit(this.cursorLng);
			this.cursorMoveNS.emit(this.cursorLat);
			// console.log(JSON.stringify(e.lngLat));
			;
		});

		map.on('load', function() {
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
					"circle-color": "#A6423C"
				}
			});

			//   map.addLayer({
			//     'id': 'wms-model-test-layer',
			//     'type': 'raster',
			//     'source': {
			//         'type': 'raster',
			//         'tiles': [
			//             'http://localhost:8080/geoserver/victoria/wms?service=WMS&version=1.1.0&request=GetMap&layers=victoria:KBDI_SFC&styles=&bbox=140.8879867553711,-39.76999832100885,151.05409088134766,-33.929998627233346&width=768&height=441&srs=EPSG:4326&format=image%2Fpng'
			//         ],
			//         'tileSize': 256
			//     },
			//     'paint': {}
			// }, 'water');



			// map.addSource('kbdi', {
			//   'type': 'raster',
			//   'url': 'http://localhost:8080/geoserver/victoria/wms?service=WMS&version=1.1.0&request=GetMap&layers=victoria:KBDI_SFC&styles=&bbox=140.8879867553711,-39.76999832100885,151.05409088134766,-33.929998627233346&width=768&height=441&srs=EPSG:4326&format=image%2Fpng',
			//   'tileSize': 256
			//
			// });



			//   map.addLayer({
			//     'id': 'metadata-layer-kbdi',
			//     'type': 'raster',
			//     'source': 'kbdi',
			//     'layout': {
			//         'visibility': 'visible'
			//     },
			//     'paint': {
			//       'raster-opacity': 1.0
			//     }
			// },'aeroway-taxiway');

			map.addSource('cfa', {
				'type': 'vector',
				'tiles': ['http://localhost:8080/geoserver/gwc/service/wmts?request=GetTile&service=WMTS&version=1.0.0&layer=victoria:CFA_REGION&style=&tilematrix=EPSG:900913:{z}&tilematrixset=EPSG:900913&format=application/x-protobuf;type=mapbox-vector&tilecol={x}&tilerow={y}'],
				'tileSize': 512
			});

			map.addLayer({
				'id': 'metadata-layer-cfa',
				'type': 'line',
				'source': 'cfa',
				'layout': {
					// 'visibility': 'visible'
				},
				'paint': {
					'line-color': '#f50',
					'line-width': 0.655
				},
				'source-layer': 'CFA_REGION'
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

	public setSatelliteStyle() {
		this.mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');
	}

	public setDatavizStyle() {
		this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl');
	}

	public setDefaultStyle() {
		this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj5we9hex7cy82rqimwlky6rz');
	}
}
