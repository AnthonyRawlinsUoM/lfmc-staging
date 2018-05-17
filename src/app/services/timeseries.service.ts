import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {DomSanitizer} from '@angular/platform-browser';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TimeseriesService {

  constructor(private http: Http, private sanitizer: DomSanitizer) {
  }

  private apiUrl = 'http://webfire.mobility.unimelb.net.au:8002/v1';

  // Trying version 2
  // private apiUrl = 'http://webfire.mobility.unimelb.net.au:8002/v2';

  // // Utility function
  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return headers;
  }

  postAPI(path: string, json_query: any): Observable<any[]> {
    return this.http.post(`${this.apiUrl}${path}`, json_query, {headers: this.getHeaders()})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  mpgAPI(path: string, json_query: any): Observable<any[]> {
    return this.http.post(`${this.apiUrl}/fuel.mp4`, json_query, {headers: this.getHeaders()})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAPI(path: string, jq: any): Observable<any[]> {
    const qs = `?start=${jq.start}&finish=${jq.finish}&models=${jq.models}&weighted=${jq.weighted}&geo_json=${jq.geo_json}&response_as=${jq.response_as}`;
    return this.http.get(`${this.apiUrl}${path}${qs}`, {headers: this.getHeaders()})
      // .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
