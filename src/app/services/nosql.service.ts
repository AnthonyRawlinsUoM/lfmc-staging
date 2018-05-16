import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class NosqlService {

  constructor(private http: Http) {
  }

  private url = 'http://webfire.mobility.unimelb.edu.au:1880';

  get(name: string): Observable<any> {
    const model$ = this.http
      .get(`${this.url}${name}`, {headers: this.getHeaders()})
      //
      .map((resp: Response) => resp.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    return model$;
  }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return headers;
  }

  // getAll(): Observable<any[]> {
  // 	return this.http.get(`${this.url}`)
  // 		.map((res: Response) => res.json())
  // 		.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

}
