import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TemporalService {

  private pipeline = 'https://pipeline.landscapefuelmoisture.bushfirebehaviour.net.au';

  constructor(private http: HttpClient) { }

  timesForModel(model_name) {
    return this.http.post(`${this.pipeline}/temporal`, {'model': model_name}, httpOptions);
  }
}
