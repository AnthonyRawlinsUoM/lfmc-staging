import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Model} from '../components/models/model';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ModelsService {

  constructor(private http: Http) {
  }

  private modelsUrl = 'http://webfire.mobility.unimelb.net.au:8002/v1';

  get(abbr: any): Observable<any> {
    return this.http
      .get(`${this.modelsUrl}/${abbr}`, {headers: this.getHeaders()})
      .map((resp: Response) => resp.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Utility function
  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return headers;
  }

  getModels(): Observable<any> {
    return this.http.get(this.modelsUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
