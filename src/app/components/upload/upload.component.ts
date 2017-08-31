import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { MapboxUploadAPIS3Service } from '../../services/mapbox-upload-api-s3.service';
import { ConfirmModal } from '../confirm-modal/confirm-modal.component';
import { SuiModal, ComponentModalConfig, ModalSize } from "ng2-semantic-ui";

// TODO
const URL = 'http:////localhost:1880/upload';

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

  constructor() {
    this.uploader = new FileUploader({url: URL});
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    // this.modalService
    //   .open(new ConfirmModal("Are you sure?", "Are you sure about accepting this?", ModalSize.Small))
    //   .onApprove(() => alert("User has accepted."))
    //   .onDeny(() => alert("User has denied."));
  }

  ngOnInit() {
  }



}
