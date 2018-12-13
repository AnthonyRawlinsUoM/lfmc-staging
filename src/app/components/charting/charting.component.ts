import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TimeseriesService} from '../../services/timeseries.service';
import * as shape from 'd3-shape';
import {ConfirmModal} from '../confirm-modal/confirm-modal.component';
import {SuiModalService} from 'ng2-semantic-ui';
import {ErrorReportingService} from '../../services/error-reporting.service';

import {filter, map, delay, catchError, mergeMap} from 'rxjs/operators';
import {forkJoin, of, throwError} from 'rxjs';

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

  @Output() select: EventEmitter<any> = new EventEmitter();

  dimmer: boolean;

  qt: any = [];

  single: any[];
  multi: any;
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
  yAxisLabel = 'Landscape Fuel Moisture Condition';
  showGridLines = true;
  timeline = false;
  roundDomains = true;
  fitContainer = true;
  realTimeData = true;
  colorScheme: any;
  schemeType = 'linear';
  selectedColorScheme = 'viridis';
  autoScale = true;

  chart_is_ready = false;

  highlights: any[] = [];

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
  default_single = [
    {
      'name': 'Nolan',
      'value': 10
    }
  ];
  default_multi = [
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

  constructor(private tss: TimeseriesService,
              private modalService: SuiModalService,
              private errorReportingService: ErrorReportingService) {

    this.lat = 0;
    this.lng = 0;

    this.multi = this.default_multi;
    this.single = this.default_single;
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

    console.log('Calling API');

    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    function reviver(key, value) {
      if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value);
      }
      return value;
    }

    this.multi = [];

    this.tss.submit(
      name,
      json_query
    ).subscribe(
      (m) => {
        console.log(m);
        this.qt = m;
      },
      e => {
        console.log(e);
        this.modalService
          .open(new ConfirmModal('An error occurred', e.message, 'tiny'));
        this.dimmer = true;
      },
      () => {
        // For each subtask...
        // monitor_progress();
        // catch_errors();
        // then ...
        // this.multi = merge_results();

        // this.dimmer = false;
      });
  }



// if (this.multi['error'] && this.multi['code']) {
//
//   const error_mesg = {
//     'err': this.multi['error'],
//     'code': this.multi['code'],
//   };
//
//   this.modalService
//     .open(new ConfirmModal('An error occurred: ' + this.multi['code'], this.multi['error'] + '\nSend Report?', 'tiny'))
//     .onApprove(() => {
//       this.errorReportingService.notifyAuthorOfError(error_mesg);
//     })
//     .onDeny(() => {
//     });
// } else {
//
//   for (const ts in this.multi) {
//     if (ts['error'] || ts['code']) {
//
//       const error_mesg = {
//         'err': ts['error'],
//         'code': ts['code'],
//       };
//
//       this.modalService
//         .open(new ConfirmModal('An error occurred: ' + ts['code'], ts['error'] + '\nSend Report?', 'tiny'))
//         .onApprove(() => {
//           this.errorReportingService.notifyAuthorOfError(error_mesg);
//         })
//         .onDeny(() => {
//         });
//     }
//   }

// }


  public getFuelForShapeWithModels(geo_json: any, start: string, finish: string, models: any[], response_as: LFMCResponseType) {

    console.log('>>> Creating query');
    this.chart_is_ready = true;

    const json_query = {
      'geo_json': geo_json,
      'models': models,
      'start': start,
      'finish': finish
    };

    switch (+response_as) {
      case LFMCResponseType.TIMESERIES:
        this.getFuelByPost('/submit_query.json', json_query);
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

  onSelect(e) {
    console.log('Got select event from chart.');
    console.log(e);

    this.select.emit(e);
  }

  onActivateAndDeactivate() {
    console.log(this.highlights);
    // this.select.emit();
  }

  do_cancel() {
    this.dimmer = false;
    this.multi = this.default_multi;
  }
}
