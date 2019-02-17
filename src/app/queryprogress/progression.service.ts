import {Injectable} from '@angular/core';
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
export class ProgressionService {

  private pipeline = 'http://pipeline.landscapefuelmoisture.bushfirebehaviour.net.au';

  constructor(private http: HttpClient) {
  }

  getProgress(uuid) {
    return this.http.get(`${this.pipeline}/progress?uuid=${uuid}`, httpOptions);
    // return this.http.get(`http://localhost:5555/api/task/info/${uuid}`, httpOptions);
  }

  getResult(uuid) {
    return this.http.get(`${this.pipeline}/result?uuid=${uuid}`, httpOptions);
  }

  abort(uuid) {
    return this.http.post(`${this.pipeline}/abort/${uuid}`, {'terminate': 'true'}, httpOptions);
  }

  revoke(uuid) {
    return this.http.post(`${this.pipeline}/revoke/${uuid}`, {'terminate': 'true'}, httpOptions);
  }

  submit(json) {
    return this.http.post(`${this.pipeline}/submit`, json, httpOptions);
  }
}
