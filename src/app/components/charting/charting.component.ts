import {Component, OnInit, Input, Output} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TimeseriesService} from '../../services/timeseries.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import * as shape from 'd3-shape';
import * as d3 from 'd3';
import {ConfirmModal} from '../confirm-modal/confirm-modal.component';
import {SuiModalService} from 'ng2-semantic-ui';

export enum LFMCResponseType {
  TIMESERIES = 0,
  MP4 = 1,
  NETCDF = 2
}

@Component({
  selector: 'app-charting',
  templateUrl: './charting.component.html',
  styleUrls: ['./charting.component.css']
})
export class ChartingComponent implements OnInit {

  @Input() lat: number;
  @Input() lng: number;

  @Input() @Output() start: string;
  @Input() @Output() finish: string;

  dimmer: boolean;

  single: any[];
  multi: any[];
  // view = [1900, 350];
  view = undefined;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Fuel Moisture (%)';
  showGridLines = true;
  timeline = false;
  roundDomains = true;
  fitContainer = true;
  realTimeData = true;
  colorScheme: any;
  schemeType = 'linear';
  selectedColorScheme = 'viridis';
  autoScale = true;

  curves = {
    Linear: shape.curveLinear,
    Bundle: shape.curveBundle.beta(1),
    Natural: shape.curveNatural,
    Montone: shape.curveMonotoneX
  };

  curveType = 'Montone';
  curve: any = this.curves[this.curveType];
  interpolationTypes = [
    'Cardinal', 'Linear', 'Natural', 'Monotone'
  ];
  // line, area

  // Reference lines
  showRefLabels = true;
  referenceLines: any[] = [
    {
      name: 'Ignition Risk', value: 2.5
    },
    {
      name: 'Online', value: 10
    }
  ];
  // an array of reference lines to be shown behind the chart. Every reference line should be of format {name, value}
  showRefLines = true; // show or hide the reference lines

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
        '#fde725',
        '#eae51a',
        '#d5e21a',
        '#c0df25',
        '#a8db34',
        '#93d741',
        '#7fd34e',
        '#6ccd5a',
        '#58c765',
        '#48c16e',
        '#3aba76',
        '#2eb37c',
        '#25ab82',
        '#20a386',
        '#1e9c89',
        '#1f948c',
        '#228c8d',
        '#25848e',
        '#287d8e',
        '#2b758e',
        '#2e6d8e',
        '#32658e',
        '#365d8d',
        '#3a548c',
        '#3e4a89',
        '#424186',
        '#453882',
        '#472e7c',
        '#482374',
        '#48186a',
        '#470d60',
        '#440154',
      ]
    }
  ];

  constructor(private tss: TimeseriesService, private modalService: SuiModalService) {

    this.lat = 0;
    this.lng = 0;

    const single = [
      {
        'name': 'Nolan',
        'value': 10
      }
    ];

    const multi = [
      {
        'name': 'dead_fuel',
        'series': [
          {'name': new Date('2017-09-20T00:00:00.001Z'), 'value': 10.3, 'min': 9.01, 'max': 10.56},
          {'name': new Date('2017-09-20T01:00:00.001Z'), 'value': 11.12, 'min': 11.36, 'max': 11.5},
          {'name': new Date('2017-09-20T02:00:00.001Z'), 'value': 12.32, 'min': 12.15, 'max': 13.5},
          {'name': new Date('2017-09-20T03:00:00.001Z'), 'value': 13.17, 'min': 12.64, 'max': 14.61},
          {'name': new Date('2017-09-20T04:00:00.001Z'), 'value': 14.52, 'min': 13.68, 'max': 16.56},
          {'name': new Date('2017-09-20T05:00:00.001Z'), 'value': 17.46, 'min': 13.98, 'max': 21.65},
          {'name': new Date('2017-09-20T06:00:00.001Z'), 'value': 17.18, 'min': 15.31, 'max': 18.53},
          {'name': new Date('2017-09-20T07:00:00.001Z'), 'value': 16.27, 'min': 15.63, 'max': 18.96},
          {'name': new Date('2017-09-20T08:00:00.001Z'), 'value': 15.75, 'min': 14.39, 'max': 18.32},
          {'name': new Date('2017-09-20T09:00:00.001Z'), 'value': 13.94, 'min': 12.06, 'max': 14.35},
          {'name': new Date('2017-09-20T10:00:00.001Z'), 'value': 11.19, 'min': 10.03, 'max': 12.87}

        ]
      },

      {
        'name': 'live_fuel',
        'series': [
          {'name': new Date('2017-09-20T00:00:00.001Z'), 'value': 11.3, 'min': 9.01, 'max': 14.56},
          {'name': new Date('2017-09-20T01:00:00.001Z'), 'value': 12.12, 'min': 10.36, 'max': 15.51},
          {'name': new Date('2017-09-20T02:00:00.001Z'), 'value': 16.32, 'min': 12.15, 'max': 18.52},
          {'name': new Date('2017-09-20T03:00:00.001Z'), 'value': 15.17, 'min': 12.64, 'max': 20.61},
          {'name': new Date('2017-09-20T04:00:00.001Z'), 'value': 19.52, 'min': 13.68, 'max': 21.56},
          {'name': new Date('2017-09-20T05:00:00.001Z'), 'value': 23.46, 'min': 13.98, 'max': 28.65},
          {'name': new Date('2017-09-20T06:00:00.001Z'), 'value': 23.18, 'min': 11.64, 'max': 28.65},
          {'name': new Date('2017-09-20T07:00:00.001Z'), 'value': 21.27, 'min': 13.98, 'max': 28.65},
          {'name': new Date('2017-09-20T08:00:00.001Z'), 'value': 18.75, 'min': 13.98, 'max': 28.65},
          {'name': new Date('2017-09-20T09:00:00.001Z'), 'value': 17.94, 'min': 13.98, 'max': 28.65},
          {'name': new Date('2017-09-20T10:00:00.001Z'), 'value': 14.19, 'min': 13.98, 'max': 28.65}
        ]
      }
    ];

    Object.assign(this, {single, multi});
  }

  ngOnInit() {
    this.setColorScheme('viridis');
    this.dimmer = true;
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  // Reconstitutes the time-series dates to format suitable for D3 consumption
  // as required by ngx-charts
  getFuelByPost(name: string, json_query) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    function reviver(key, value) {
      if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value);
      }
      return value;
    }
    return this.tss.postAPI(
      name,
      json_query
    ).subscribe(
      (m) => {
        this.multi = JSON.parse(JSON.stringify(m), reviver);
        if (this.multi['error'] && this.multi['code']) {
          this.modalService
            .open(new ConfirmModal('An error occurred: ' + this.multi['code'] , this.multi['error'] + '\nSend Report?', 'tiny'))
            .onApprove(() => alert('Report sent.'))
            .onDeny(() => alert('No report sent.'));
        } else {
          this.dimmer = false;
        }
      },
      e => {
        this.multi = [];
        this.modalService
          .open(new ConfirmModal('An error occurred', e, 'tiny'));
        this.dimmer = true;
      },
      () => {
        // this.modalService
        //   .open(new ConfirmModal('Success!', 'Your chart is ready.', 'tiny'));
        this.dimmer = false;
      });
  }

  // TODO - Toggle weighted selections ON/OFF
  // Eg., Doesn't make sense to weight a categorical index by area.
  public getFuelForShapeWithModels(geo_json: any, start: string, finish: string, models: any[], response_as: LFMCResponseType) {
    const json_query = {
      'geo_json': geo_json,
      'models': models,
      'start': start,
      'finish': finish,
      'weighted': 'True',
      'response_as': response_as
    };

    switch (+response_as) {
      case LFMCResponseType.TIMESERIES:

        this.getFuelByPost('/fuel.json', json_query);
        break;
      // case LFMCResponseType.MP4:
      //   this.tss.postAPI('/fuel.mp4', json_query).subscribe(m => {
      //     // this.multi = JSON.parse(JSON.stringify(m), reviver);
      //   });
      //   break;
      // case LFMCResponseType.NETCDF:
      //   this.getFuelByPost('/fuel.nc', json_query);
      //   break;
    }
  }
}
