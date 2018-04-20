import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-datasources',
	templateUrl: './datasources.component.html',
	styleUrls: ['./datasources.component.css']
})
export class DatasourcesComponent implements OnInit {
	datasources: any[] = [];
  @Input() model:any = {};

	constructor(private sourceserver: ApiService) {
        this.model = {"abbr":"boer"};
	}

	ngOnInit() {
		this.getDatasources(this.model.abbr);
	}

  getDatasources(abbr:string) {
    return this.sourceserver.callAPI(`/model/${abbr}/datasources`).subscribe(m => {
      console.log(m);
      this.datasources = m;
    });
  }

  enable(m:any) {

  }
}
