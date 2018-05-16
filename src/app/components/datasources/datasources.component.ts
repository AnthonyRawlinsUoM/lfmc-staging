import {Component, Input, OnInit} from '@angular/core';
import {NosqlService} from '../../services/nosql.service';

@Component({
  selector: 'app-datasources',
  templateUrl: './datasources.component.html',
  styleUrls: ['./datasources.component.css']
})
export class DatasourcesComponent implements OnInit {
  datasources: any[] = [];
  @Input() model: any = {};

  constructor(private ns: NosqlService) {
    this.model = {'abbr': 'dead_fuel'};
  }

  ngOnInit() {
    this.getDatasources(this.model.abbr);
  }

  getDatasources(abbr: string) {
    return this.ns.get(`/model/${abbr}/datasources`).subscribe(m => {
      console.log(m);
      this.datasources = m;
    });
  }
}
