import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {MapboxUploadAPIS3Service} from '../../services/mapbox-upload-api-s3.service';
import {ConfirmModal} from '../confirm-modal/confirm-modal.component';
import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';
import {Headers} from '@angular/http';
import {PersistenceService, StorageType} from 'angular-persistence';
import {GeoJSONQuery} from '../importeditems/importeditems.component';
import {Observable, Subscription} from 'rxjs/index';

// TODO
// const URL = 'https://pipeline:1880/upload';
const URL = 'https://pipeline.landscapefuelmoisture.bushfirebehaviour.net.au/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {

  conversions = [];
  sample_queries: GeoJSONQuery[];
  queries: GeoJSONQuery[];

  step = 'step1';

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean;

  authSubscription: Subscription;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private auth: AuthService,
              private store: PersistenceService,
              private http: HttpClient) {
    this.auth = auth;
    this.store = store;

    this.uploader = new FileUploader({url: URL});
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.queries = [];
    this.sample_queries = [];

    this.uploader.onCompleteItem = (item) => {
      console.log(item.file.name);

      if (item.file.name.endsWith('.shp')) {
        // TODO
        // subscribe to the CDN
        const converted = item.file.name.replace('.shp', '.json');
        this.conversions.push(converted);
        // conversion = GeoJSONQuery(item.file.name, geo_json_response_from_CDN_service);
      }

      if (item.file.name.endsWith('.json')) {
        // TODO
        // Can't add the json directly (over-complexity?)
        // subscribe to the CDN
      }

    };

    this.uploader.onCompleteAll = () => {
      console.log('Queue upload complete.');
      // Retrieve contents
      this.storeConversions();
      this.step = 'step4';
    };
  }

  ngOnInit() {
    this.authSubscription = this.auth.loggedIn$
      .subscribe(loggedIn => {
          if (loggedIn) {
            console.log('Getting locally-stored queries.');
            console.log('name for storage is: ' + this.auth.userProfile.name);
            const stored_queries = this.store.get(this.auth.userProfile.name, StorageType.LOCAL);
            if (stored_queries !== undefined) {
              console.log(stored_queries);
              this.queries = stored_queries;
            } else {
              this.queries = [];
            }
          }
        }
      );
    // const sub = this.store.changes().subscribe((key, storageType) => {
    //   console.log( key + ' was changed on sotrage number ' + storageType);
    // });

    console.log(this.queries);
  }

  ngOnDestroy() {
    // this.authSubscription.unsubscribe();
  }

  getConversion(c): any {
    const cdnl = 'http://cdn.landscapefuelmoisture.bushfirebehaviour.net.au/' + c;
    console.log('Getting... ' + c);

    let geo: any;
    let result: any;
    
    this.step = 'step2';
    this.http.get(cdnl, {}).subscribe(
        (data) => {
              result = data;
        },
        (e) => {
            console.log(e);
        },
        () => {
            if (this.auth.authenticated) {
                let updated = false;
                this.queries.forEach((q) => {
                    if (q.name == c) {
                        q.geojson = result;
                        updated = true;
                        geo = q;
                    }
                });
                
                if(!updated) {
                    geo = new GeoJSONQuery(c, result);
                }
                console.log(geo);
                this.queries.push(geo);
                this.store.set(this.auth.userProfile.name, this.queries, {type: StorageType.LOCAL});
                this.step = 'step3';
            }
        });
  }

  storeConversions() {
    for (const c of this.conversions) {
      if (this.auth.authenticated) {
        this.getConversion(c);
        console.log('Getting any converted files.');
      } else {
        console.log('Authentication Error getting converted JSON.');
      }
    }
  }
}
