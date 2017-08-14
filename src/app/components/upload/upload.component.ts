import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { MapboxUploadAPIS3Service } from '../../services/mapbox-upload-api-s3.service';

// TODO
const URL = '/api';

@Component({
  selector: 'lfmc-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean;
  public hasAnotherDropZoneOver:boolean;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private s3Service:MapboxUploadAPIS3Service) {
    this.uploader = new FileUploader({url: URL});
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
  }

  ngOnInit() {
  }

}
