import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Model} from '../components/models/model';

import {Observable} from 'rxjs/index';


@Injectable()
export class ModelsService {

  constructor(private http: HttpClient) {
  }

  private modelsUrl = 'http://lfmc.landfood.unimelb.edu.au:8002/v1';

  get(abbr: any): Observable<any> {
    return this.http
      .get(`${this.modelsUrl}/${abbr}`);
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
    return this.http.get(this.modelsUrl);
  }
}
