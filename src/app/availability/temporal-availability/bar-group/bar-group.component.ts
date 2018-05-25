import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-group',
  templateUrl: './bar-group.component.html',
  styleUrls: ['./bar-group.component.css']
})
export class BarGroupComponent implements OnInit {

  @ViewChild('group') group: ElementRef;
  @Input() sub_bars = [];
  @Input() columnWidth: number;
  @Input() year: number;
  @Input() series: any[];

  days_in_year: number;

  constructor() {
  }

  ngOnInit() {

    console.log(this.year);

    console.log('Checking for content for this model.');
    // this.sub_bars = [ { 'have': false, 'days': 60 } ];  // Example
    const first_day_of_year = moment(this.year + '-01-01', 'YYYY-MM-DD');
    const last_day_of_year = moment(this.year + '-12-31', 'YYYY-MM-DD');

    let last_day_we_have = first_day_of_year;

    this.days_in_year = last_day_of_year.dayOfYear();

    console.log(last_day_of_year.format());

    for (let i = 0; i < this.series.length; i++) {

      const dp = this.series[i];

      console.log(dp);

      const dps = moment(dp[0], 'YYYY-MM-DD');
      const dpf = moment(dp[1], 'YYYY-MM-DD');

      // Starts before & Finishes after
      if ((dps.isSameOrBefore(first_day_of_year, 'day')) &&
        (dpf.isSameOrAfter(last_day_of_year, 'day'))) {
        console.log('row #' + i + ' in the series starts and finishes outside this current year(%s)', this.year);
        console.log('Therefore we have the entirety of ', this.year);
        this.sub_bars = [{'have': true, 'days': this.days_in_year}];
      }

      // Starts before & Finishes during
      if ((dps.isSameOrBefore(first_day_of_year, 'day')) &&
        (dpf.isBefore(last_day_of_year, 'day'))) {
        console.log('row #' + i + ' in the series starts on/before Jan 1 and finishes during this current year(%s)', this.year);
        this.sub_bars = [{'have': true, 'days': dpf.dayOfYear()}];
        last_day_we_have = dpf;
      }

      // Starts & Finishes during
      if ((first_day_of_year.isSame(dps, 'year')) &&
        (last_day_of_year.isSame(dpf, 'year'))
      ) {
        console.log('row #' + i + ' in the series starts and finishes in this current year(%s)', this.year);
        this.sub_bars.push({'have': false, 'days': dps.dayOfYear() - last_day_we_have.dayOfYear()});
        this.sub_bars.push({'have': true, 'days': dpf.dayOfYear() - dps.dayOfYear()});
        last_day_we_have = dpf;
      }
    }
    // Complete the year

    // if (last_day_we_have.isBefore(last_day_of_year)) {
    //   this.sub_bars.push({'have': false, 'days': last_day_of_year.dayOfYear() - last_day_we_have.dayOfYear()});
    // }

    if (this.sub_bars.length === 0) {
      this.sub_bars.push({'have': false, 'days': last_day_of_year.dayOfYear()});
    }
  }


  private thisYear() {
    return moment().year(this.year);
  }


}
