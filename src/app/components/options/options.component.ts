import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  hotspots:boolean;
  bushfires:boolean;
  fires:boolean;

  constructor() { }

  ngOnInit() {
    this.fires = true;
    this.bushfires = true;
    this.hotspots = true;
  }

}
