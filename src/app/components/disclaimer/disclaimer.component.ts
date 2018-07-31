import { Component, OnInit } from '@angular/core';
import {SuiModalService} from 'ng2-semantic-ui';

@Component({
  selector: 'lfmc-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  constructor(private modal: SuiModalService) { }

  ngOnInit() {

  }

}
