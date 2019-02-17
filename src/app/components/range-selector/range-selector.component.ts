import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {jqxRangeSelectorComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxrangeselector';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.css']
})
export class RangeSelectorComponent implements OnInit, AfterViewInit {
  @ViewChild('rangeSelector') myRangeSelector: jqxRangeSelectorComponent;


  @Input() min: Date = new Date(2017, 0, 1);
  @Input() max: Date = new Date();

  @Input() start: Date;
  @Input() finish: Date;

  range: any = { from: this.start, to: this.finish };

  @Output() rangeChange: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.myRangeSelector.refresh();
  }

  update() {
    this.rangeChange.emit(this.myRangeSelector.getRange());
  }
}
