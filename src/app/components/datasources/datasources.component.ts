import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'lfmc-datasources',
	templateUrl: './datasources.component.html',
	styleUrls: ['./datasources.component.css']
})
export class DatasourcesComponent implements OnInit {
	datasources: any[] = [];
  @Input() model:any = {};

	constructor(private sourceserver: ApiService) {
    this.model = {"name":"Boer"};
	}

	ngOnInit() {
		this.getDatasources(this.model.name);
	}

  getDatasources(name:string) {
    return this.sourceserver.getModelDatasources(name).subscribe(m => {
      console.log(m);
      this.datasources = m;
    });
  }

  enable(m:any) {

  }
}
