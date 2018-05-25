import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {BarGroupComponent} from '../bar-group/bar-group.component';

@Component({
  selector: 'app-indicator-bar',
  templateUrl: './indicator-bar.component.html',
  styleUrls: ['./indicator-bar.component.css']
})
export class IndicatorBarComponent implements OnInit {
  @ViewChild(BarGroupComponent) bgc;
  @ViewChildren(BarGroupComponent) bargroups: QueryList<BarGroupComponent>;

  @Input() years: number[];
  @Input() series: any[];
  @Input() columnWidth: number;

  // years = [2008, 2009, 2010];

  constructor() { }

  ngOnInit() {
    console.log(this.series);
  }
}
