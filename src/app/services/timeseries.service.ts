import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {DomSanitizer} from '@angular/platform-browser';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable()
export class TimeseriesService {

  constructor(private http: HttpClient) {
  }

  private pipeline = 'http://pipeline.landscapefuelmoisture.bushfirebehaviour.net.au/';
  // private apiUrl = 'http://api.landscapefuelmoisture.bushfirebehaviour.net.au/v1';

  submit(path: string, json_query: any) {
    return this.http.post(`${this.pipeline}${path}`, json_query, httpOptions);
  }

  // Revoke task
  revoke(uuid) {
    this.http.get(`${this.pipeline}/revoke?uuid=${uuid}`, httpOptions);
  }

  // Get the cached result of the task
  result(uuid) {
    return this.http.get(`${this.pipeline}/result?uuid=${uuid}`, httpOptions);
  }

  // Abort a running task
  abort(uuid) {
    this.http.get(`${this.pipeline}/abort?uuid=${uuid}`, httpOptions);
  }

  // Observe the progress of a task
  progress(uuid): Observable<any> {
    // return this.http.get(`${this.flower}/task/info/${uuid}`, httpOptions);
    return this.http.get(`${this.pipeline}/progress?uuid=${uuid}`, httpOptions);
  }
}
