import {Component, ContentChildren, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as moment from 'moment';
import {ChartingComponent} from '../../components/charting/charting.component';
import {AvailabilityRowComponent} from './availability-row/availability-row.component';

@Component({
  selector: 'app-temporal-availability',
  templateUrl: './temporal-availability.component.html',
  styleUrls: ['./temporal-availability.component.css']
})
export class TemporalAvailabilityComponent implements OnInit {
  @ContentChildren(AvailabilityRowComponent) rows: QueryList<AvailabilityRowComponent>;
  // @ViewChild(AvailabilityRowComponent)

  // private rowComponent: AvailabilityRowComponent;

  @Input() availability: any[];

  range_min: Date;
  range_max: Date;

  percentage_width = 100;
  columns = 1;


  private years_range: any[];

  constructor() {
  }

  ngOnInit() {
    console.log(this.availability);

    let r = [3000, 2001];

    for (let i = 0; i < this.availability.length; i++) {
      const s = this.availability[i];
      console.log('Checking: ' + s);
      if (s.series) {
        for (let j = 0; j < s.series.length; j++) {

          const b = moment(s.series[j][0], 'YYYY-MM-DD').year();
          const f = moment(s.series[j][1], 'YYYY-MM-DD').year();
          console.log('begin: %s, end: %s', b, f);
          r = this.yearLimits([b, f], r);
        }
      }
    }

    console.log('Year range: %s to %s', r[0], r[1]);

    this.range_min = moment(r[0] + '-01-01', 'YYYY-MM-DD').toDate();
    this.range_max = moment(r[1] + '-12-31', 'YYYY-MM-DD').toDate();
    this.yearWidth(this.range_min, this.range_max);

    this.years_range = [];
    for (let y = r[0]; y <= r[1]; y++) {
      this.years_range.push(y);
    }
    console.log(this.columns + 'columns @ ' + this.percentage_width + '% ea.');
  }

  yearLimits(y1, y2) {
    return [Math.min(y1[0], y2[0]), Math.max(y1[1], y2[1])];
  }

  yearWidth(start, finish): void {

    console.log('Temporal Range of inputs from: %s to %s', start, finish);
    // width / Number of years = column width as %
    const years = moment(finish).diff(start, 'years', false);
    if (years > 0) {
      this.percentage_width = 100 / (years + 1);
      this.columns = years + 1;
    } else {
      this.percentage_width = 100;
      this.columns = 1;
    }

  }
}
