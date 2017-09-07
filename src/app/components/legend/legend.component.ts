import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lfmc-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {

  legendItems: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
