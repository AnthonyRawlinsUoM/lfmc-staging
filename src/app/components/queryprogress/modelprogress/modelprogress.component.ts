import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modelprogress',
  templateUrl: './modelprogress.component.html',
  styleUrls: ['./modelprogress.component.css']
})
export class ModelprogressComponent implements OnInit {

  @Input() uuid: string;

  constructor() { }

  ngOnInit() {
  }

}
