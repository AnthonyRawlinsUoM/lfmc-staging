import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatasourcesService } from '../../services/datasources.service';

import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'lfmc-datasources',
	templateUrl: './datasources.component.html',
	styleUrls: ['./datasources.component.css']
})
export class DatasourcesComponent implements OnInit {
	datasources: any[] = [];
  @Input() model:any = {};

	constructor(private sourceserver: DatasourcesService) {
    this.model = {"name":"Boer"};
	}

	ngOnInit() {
		this.getDatasources(this.model.name);
	}

  getDatasources(name:string) {
    return this.sourceserver.getDatasources(name).subscribe(m => {
      console.log(m);
      this.datasources = m;
    });
  }

  enable(m:any) {

  }
}
