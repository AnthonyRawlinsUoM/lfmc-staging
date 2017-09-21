import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '@swimlane/ngx-charts';

import * as shape from 'd3-shape';
import * as d3 from 'd3';

@Component({
	selector: 'lfmc-charting',
	templateUrl: './charting.component.html',
	styleUrls: ['./charting.component.css']
})
export class ChartingComponent implements OnInit {

	single: any[];
	multi: any[];
  view = [1920,250];
	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Model';
	showYAxisLabel = true;
	yAxisLabel = 'Fuel Moisture (%)';
	showGridLines = false;
	timeline = false;
	roundDomains = true;
	fitContainer: boolean = true;
	realTimeData: boolean = false;
	colorScheme: any;
	schemeType: string = 'linear';
	selectedColorScheme: string = 'viridis';

	curves = {
		Linear: shape.curveLinear,
		Natural: shape.curveNatural
	}

	curveType: string = 'Natural';
	curve: any = this.curves[this.curveType];
	interpolationTypes = [
		'Cardinal', 'Linear', 'Natural',
	];
	// line, area
	autoScale = true;

	// Reference lines
	showRefLines: boolean = true;
	showRefLabels: boolean = true;

	// Supports any number of reference lines.
	refLines = [
		{ value: 99, name: 'Maximum' },
		{ value: 50, name: 'Average' },
		{ value: 1, name: 'Minimum' }
	];

  colorSets = [
    {
      name: 'vivid',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
      ]
    },
    {
      name: 'natural',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
      ]
    },
    {
      name: 'cool',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
      ]
    },
    {
      name: 'fire',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
      ]
    },
    {
      name: 'solar',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00'
      ]
    },
    {
      name: 'air',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'
      ]
    },
    {
      name: 'aqua',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
      ]
    },
    {
      name: 'flame',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738'
      ]
    },
    {
      name: 'ocean',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1'
      ]
    },
    {
      name: 'forest',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
      ]
    },
    {
      name: 'horizon',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0'
      ]
    },
    {
      name: 'neons',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600'
      ]
    },
    {
      name: 'picnic',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
      ]
    },
    {
      name: 'night',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#2B1B5A', '#501356', '#183356', '#28203F', '#391B3C', '#1E2B3C', '#120634',
        '#2D0432', '#051932', '#453080', '#75267D', '#2C507D', '#4B3880', '#752F7D', '#35547D'
      ]
    },
    {
      name: 'nightLights',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
        '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3'
      ]
    },
    {
      name: 'viridis',
      selectable: true,
      group: 'Continuous',
      domain: [

        '#bddf26',
        '#7ad151',
        '#42be71',
        '#22a884',
        '#21908d',
        '#2a788e',
        '#355f8d',
        '#414487',
        '#482475',
        '#440154'
      ]
    }
  ];

	constructor() {

		var single = [
			{
				"name": "Nolan",
				"value": 10
			},
			{
				"name": "Boer",
				"value": 11
			},
			{
				"name": "Kumar",
				"value": 11.5
			}
		];

		var multi = [
			{
				"name": "Nolan",
				"series": [
					{"name": "00:00", "value": 10.3	},
					{"name": "01:00", "value": 11.12	},
          {"name": "02:00", "value": 12.32	},
					{"name": "03:00", "value": 13.17	},
          {"name": "04:00", "value": 14.52	},
					{"name": "05:00", "value": 17.46	},
          {"name": "06:00", "value": 17.18	},
					{"name": "07:00", "value": 16.27	},
          {"name": "08:00", "value": 15.75	},
					{"name": "09:00", "value": 13.94	},
          {"name": "10:00", "value": 11.19	},
					{"name": "11:00", "value": 9.47	},
          {"name": "12:00", "value": 6.84	},
					{"name": "13:00", "value": 3.57	},
          {"name": "14:00", "value": 1.21	},
					{"name": "15:00", "value": 64.15	},
          {"name": "16:00", "value": 98.01	},
					{"name": "17:00", "value": 94.38	},
          {"name": "18:00", "value": 85.56	},
					{"name": "19:00", "value": 72.12	},
          {"name": "20:00", "value": 66.82	},
					{"name": "21:00", "value": 50.23	},
          {"name": "22:00", "value": 39.12	},
					{"name": "23:00", "value": 28.34	}
				]
			},

			{
				"name": "Boer",
				"series": [
          {"name": "00:00", "value": 11.3	},
					{"name": "01:00", "value": 12.12	},
          {"name": "02:00", "value": 16.32	},
					{"name": "03:00", "value": 15.17	},
          {"name": "04:00", "value": 19.52	},
					{"name": "05:00", "value": 23.46	},
          {"name": "06:00", "value": 23.18	},
					{"name": "07:00", "value": 21.27	},
          {"name": "08:00", "value": 18.75	},
					{"name": "09:00", "value": 17.94	},
          {"name": "10:00", "value": 14.19	},
					{"name": "11:00", "value": 8.47	},
          {"name": "12:00", "value": 2.84	},
					{"name": "13:00", "value": 5.57	},
          {"name": "14:00", "value": 7.21	},
					{"name": "15:00", "value": 62.15	},
          {"name": "16:00", "value": 94.01	},
					{"name": "17:00", "value": 93.38	},
          {"name": "18:00", "value": 81.56	},
					{"name": "19:00", "value": 77.12	},
          {"name": "20:00", "value": 64.82	},
					{"name": "21:00", "value": 57.23	},
          {"name": "22:00", "value": 34.12	},
					{"name": "23:00", "value": 22.34	}
				]
			},

			{
				"name": "Kumar",
				"series": [
          {"name": "00:00", "value": 5.3	},
					{"name": "01:00", "value": 21.12	},
          {"name": "02:00", "value": 22.32	},
					{"name": "03:00", "value": 23.17	},
          {"name": "04:00", "value": 24.52	},
					{"name": "05:00", "value": 27.46	},
          {"name": "06:00", "value": 27.18	},
					{"name": "07:00", "value": 26.27	},
          {"name": "08:00", "value": 25.75	},
					{"name": "09:00", "value": 23.94	},
          {"name": "10:00", "value": 21.19	},
					{"name": "11:00", "value": 19.47	},
          {"name": "12:00", "value": 16.84	},
					{"name": "13:00", "value": 13.57	},
          {"name": "14:00", "value": 8.21	},
					{"name": "15:00", "value": 74.15	},
          {"name": "16:00", "value": 98.01	},
					{"name": "17:00", "value": 94.38	},
          {"name": "18:00", "value": 83.16	},
					{"name": "19:00", "value": 68.12	},
          {"name": "20:00", "value": 32.82	},
					{"name": "21:00", "value": 28.23	},
          {"name": "22:00", "value": 27.12	},
					{"name": "23:00", "value": 26.34	}
				]
			}
		];

		Object.assign(this, { single, multi });
	}

	ngOnInit() {
    this.setColorScheme('viridis');
	}

	setColorScheme(name) {
		this.selectedColorScheme = name;
		this.colorScheme = this.colorSets.find(s => s.name === name);
	}

}

export function timelineFilterBarData() {
	const results: any[] = [];
	const dataPoints = 30;
	const domain: Date[] = []; // array of time stamps in milliseconds
	const dayLength = 24 * 60 * 60 * 1000;
	let date = 1473700105009; // Sep 12, 2016
	for (let j = 0; j < dataPoints; j++) {
		// random dates between Sep 12, 2016 and Sep 24, 2016
		results.push({
			name: new Date(date),
			value: Math.floor(Math.random() * 300)
		});
		date += dayLength;
	}

	return results;
}
