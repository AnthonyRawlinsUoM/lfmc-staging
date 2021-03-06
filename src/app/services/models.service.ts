import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';


// import List = Immutable.List;


@Injectable()
export class ModelsService {

  constructor(private http: HttpClient) {
  }

  private modelsUrl = 'https://api.landscapefuelmoisture.bushfirebehaviour.net.au/v1';

  get(code: any): Observable<any> {
    return this.http
      .get(`${this.modelsUrl}/${code}`);
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
    return this.http.get(`${this.modelsUrl}/models`, {});
      // .pipe(map((response) => response.pipe(map(
      //   Object.keys(response).pipe(map(r => <Model>response[r]))))));

  }
}

export interface Model {
  name: string;
  abbr: string;
  metadata: ModelMetaData;
  parameters: ModelParameters[];
  outputs: ModelOutputs;
  tolerance: string;
  ident: string;
  code: string;
  enabled_left: boolean;
  enabled_right: boolean;
}


export interface ModelMetaData {
  authors: AuthorSchema[];
  abstract: AbstractSchema;
  published_date: Date;
  fuel_types: string;
  doi: string;
}

export interface ModelParameters {
  type: string;
}

export interface ModelOutputs {
  type: string;
}

export interface AuthorSchema {
  name: string;
  email: string;
  organisation: string;
}

export interface AbstractSchema {
  abstract: string;
}
