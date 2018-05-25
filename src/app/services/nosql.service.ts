import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class NosqlService {

  constructor(private http: HttpClient) {
  }

  private url = 'http://nosql.landscapefuelmoisture.bushfirebehaviour.net.au';

  get(name: string): Observable<any> {
    const model$ = this.http
      .get(`${this.url}${name}`);
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
