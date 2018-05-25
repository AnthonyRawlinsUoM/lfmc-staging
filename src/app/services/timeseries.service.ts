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

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
  }

  private apiUrl = 'http://api.landscapefuelmoisture.bushfirebehaviour.net.au/v1';

  // Trying version 2
  // private apiUrl = 'http://lfmc.landfood.unimelb.edu.au:8002/v2';

  postAPI(path: string, json_query: any) {
    console.log(`${this.apiUrl}${path}`);
    console.log(json_query);
    return this.http.post(`${this.apiUrl}${path}`, json_query, httpOptions);
  }

  mpgAPI(path: string, json_query: any) {
    return this.http.post(`${this.apiUrl}/fuel.mp4`, json_query);
  }

  getAPI(path: string, jq: any) {
    const qs = `?start=${jq.start}&finish=${jq.finish}&models=${jq.model_names}&weighted=${jq.weighted}&geo_json=${jq.geo_json}&response_as=${jq.response_as}`;
    return this.http.get(`${this.apiUrl}${path}${qs}`);
  }
}
