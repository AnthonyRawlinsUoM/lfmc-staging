import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-models',
	templateUrl: './models.component.html',
	styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
	models: any[] = [];
	constructor(private api: ApiService) {
	}

	ngOnInit() {
		this.api.callAPI("/models").subscribe(m => this.models = m);
	}
}
