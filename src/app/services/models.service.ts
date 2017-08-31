import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Model } from '../components/models/model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ModelsService {

  constructor(private http: Http) {}

  private modelsUrl = 'http://localhost:1880/models';

  get(id: number): Observable<Model> {
      let model$ = this.http
        .get(`${this.modelsUrl}/${id}`, {headers: this.getHeaders()})
        .map((resp:Response) => resp.json())
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        return model$;
    }
    private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

getModels(): Observable<any[]> {
  return this.http.get(this.modelsUrl)
  .map((res:Response) => res.json())
  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

}
function mapModels(response:Response): any[]{
  // The response of the API has a results
  // property with the actual results
  return response.json()
}
