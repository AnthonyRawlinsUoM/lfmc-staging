import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-filesaver',
  templateUrl: './filesaver.component.html',
  styleUrls: ['./filesaver.component.css']
})
export class FilesaverComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  saveFile() {
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    this.http.get('/api/files', {headers: headers})
      .then(response => this.saveToFileSystem(response));
  }

  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], {type: 'text/json'});
    // saveAs(blob, filename);
  }
}
