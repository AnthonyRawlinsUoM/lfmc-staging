import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModelsService } from '../../services/models.service';
import { DatasourcesModule } from '../datasources/datasources.module';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'lfmc-models',
	templateUrl: './models.component.html',
	styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
	models: any[] = [];
	constructor(private modelserver: ModelsService) {
	}

	ngOnInit() {
		this.modelserver.getModels().subscribe(m => this.models = m);
	}

  getData() {
    return this.modelserver.getModels();
  }

  getModels() {
    return this.getData().subscribe(m => {
      console.log(m);
      this.models = m;
    });
  }

  enable(m:any) {

  }
}
