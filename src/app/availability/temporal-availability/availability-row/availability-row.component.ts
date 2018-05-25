import {Component, Input, OnInit, ViewChildren} from '@angular/core';
import {IndicatorBarComponent} from '../indicator-bar/indicator-bar.component';

interface Availability {
  model: string;
  series: any[];
}

@Component({
  selector: 'app-availability-row',
  templateUrl: './availability-row.component.html',
  styleUrls: ['./availability-row.component.css']
})
export class AvailabilityRowComponent implements OnInit {

  @ViewChildren(IndicatorBarComponent) bar: IndicatorBarComponent;

  @Input() name = '';
  @Input() series: any[] = [];
  @Input() columnWidth: number;
  @Input() years: number[];

  constructor() { }

  ngOnInit() {
  }

}
