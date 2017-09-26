import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'lfmc-filesaver',
  templateUrl: './filesaver.component.html',
  styleUrls: ['./filesaver.component.css']
})
export class FilesaverComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  saveFile() {
      const headers = new Headers();
      headers.append('Accept', 'text/plain');
      this.http.get('/api/files', { headers: headers })
        .toPromise()
        .then(response => this.saveToFileSystem(response));
    }
    private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'text/json' });
    // saveAs(blob, filename);
  }
}
