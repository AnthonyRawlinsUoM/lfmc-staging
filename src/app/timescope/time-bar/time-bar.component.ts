import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {TemporalService} from '../temporal.service';

import * as moment from 'moment';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css']
})
export class TimeBarComponent implements OnInit, AfterViewInit {

  @Input() model_layer_group: string;

  min_time = new Date();
  max_time = new Date();

  // view = ['600', '28'];
  colorScheme: any;
  selectedColorScheme = 'viridis';

  // Colors are <present> / <absent>
  colorSets = [
    {
      name: 'viridis',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#365d8d',
        '#1e9c89'
      ]
    }
  ];
  example_data = [
    {
      "name": "Temporal Availability",
      "series": [
        {
          "name": "No values",
          "value": 0
        }
      ]
    }];
  data: any;

  constructor(private temporalService: TemporalService) { }

  static compare(a, b) {
    if (moment(a.name).toDate().getTime() < moment(b.name).toDate().getTime()) {
      return -1;
    }
    if (moment(a.name).toDate().getTime() > moment(b.name).toDate().getTime()) {
      return 1;
    }
    return 0;
  }

  ngOnInit() {

    this.data = this.example_data;

    this.setColorScheme('viridis');

  }

  ngAfterViewInit() {
    this.temporalService.timesForModel(this.model_layer_group).subscribe(
      (n) => {
        this.data = [n];
        this.data[0].series = this.data[0].series.sort(TimeBarComponent.compare);
        console.log(this.data);
      },
      (e) => {
        console.log(e);
      },
      () => {

        for (const ds of this.data[0].series) {
          for (const d of ds) {
            const x = new Date(d.name);
            if (x.getTime() < this.min_time.getTime()) {
              this.min_time = x;
            }
            if (d.value > 1) {
              this.max_time = moment(x).add(d.value, 'days').toDate();
            } else {
              if (x.getTime() > this.max_time.getTime()) {
                this.max_time = x;
              }
            }
          }
        }
      }
    );
  }



  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  modelExtents() {
    return [this.min_time, this.max_time];
  }


}
