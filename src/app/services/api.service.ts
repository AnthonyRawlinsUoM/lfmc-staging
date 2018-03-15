import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  private apiUrl = 'http://localhost:1880/api';
  // private apiUrl = 'http://api:8002/v1';

  // Deprecated
  getModelDatasources(name: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/model/${name}/datasources`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Utility function
  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  // Get Capabilities
  getAPI(): Observable<any[]> {
    return this.http.get(`${this.apiUrl}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // RESTful API
  callAPI(path: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}${path}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}

function mapDatasources(response: Response): any[] {
  // The response of the API has a results
  // property with the actual results
  return response.json();
}
