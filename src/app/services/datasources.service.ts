import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DatasourcesService {

	constructor(private http: Http) { }

	private datasourcesUrl = 'http://localhost:1880/model/datasources';

	getDatasources(name: string): Observable<any> {
		let model$ = this.http
			.get(`${this.datasourcesUrl}?name=${name}`, { headers: this.getHeaders() })
			.map((resp: Response) => resp.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		return model$;
	}
	private getHeaders() {
		// I included these headers because otherwise FireFox
		// will request text/html
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		return headers;
	}

	getAllDatasources(): Observable<any[]> {
		return this.http.get(`${this.datasourcesUrl}`)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

}
function mapDatasources(response: Response): any[] {
	// The response of the API has a results
	// property with the actual results
	return response.json()
}
