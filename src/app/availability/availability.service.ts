import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private WMTS_Dimensions_Url = 'http://geoserver:8080/geoserver/gwc/service/wmts?REQUEST=DescribeDomains&Version=1.0.0&TileMatrixSet=EPSG:4326&Layer=lfmc:';

  constructor(private http: HttpClient) { }

  get(code: any): Observable<any> {
    return this.http
      .get(`${this.WMTS_Dimensions_Url}${code}`);
  }
}
