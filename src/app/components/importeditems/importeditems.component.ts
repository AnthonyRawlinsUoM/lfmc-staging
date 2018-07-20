import {Component, OnInit, ElementRef, ViewChild, Input, Output, AfterViewInit, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ModelsService} from '../../services/models.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {ConfirmModal} from '../confirm-modal/confirm-modal.component';
import {PersistenceService, StorageType} from 'angular-persistence';
import {UUID} from 'angular2-uuid';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-importeditems',
  templateUrl: './importeditems.component.html',
  styleUrls: ['./importeditems.component.css']
})
export class ImportedItemsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() @Output() drawing: any;
  @Input() @Output() altdrawing: any;

  @Input() @Output() queries: GeoJSONQuery[];

  @ViewChild('editname') editname: ElementRef;
  @ViewChild('searchbox') searchbox: ElementRef;

  sample_queries: GeoJSONQuery[];
  searchterm: any;
  profile: any;

  authSubscription: Subscription;

  private emptyGeoJSON = {
    'type': 'FeatureCollection',
    'features': []
  };

  constructor(private store: PersistenceService,
              public auth: AuthService,
              private ms: ModelsService,
              private modalService: SuiModalService) {
    this.ms = ms;
    this.modalService = modalService;


    const plan1 = new GeoJSONQuery('Planned Burn 1', {
      'type': 'FeatureCollection',
      'features': [
        {
          'id': '21aff45153f64d0f8ed9d8827376b768',
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'coordinates': [
              [
                [
                  [
                    143.9109247537408,
                    -37.43137888295225
                  ],
                  [
                    143.9112230604714,
                    -37.43167755711089
                  ],
                  [
                    143.91145651790652,
                    -37.432017426246
                  ],
                  [
                    143.91128790976666,
                    -37.432233705798694
                  ],
                  [
                    143.91097663316316,
                    -37.43199682813706
                  ],
                  [
                    143.910743175728,
                    -37.431862940456696
                  ],
                  [
                    143.91053565800388,
                    -37.43192473479406
                  ],
                  [
                    143.9101854718162,
                    -37.4320998185144
                  ],
                  [
                    143.90987419524754,
                    -37.43222340677465
                  ],
                  [
                    143.90962776793936,
                    -37.43197623005006
                  ],
                  [
                    143.91009468284466,
                    -37.43165695893611
                  ],
                  [
                    143.91076911543905,
                    -37.43131708816431
                  ],
                  [
                    143.9109247537408,
                    -37.43137888295225
                  ]
                ]
              ],
              [
                [
                  [
                    143.91294805155906,
                    -37.43281044818975
                  ],
                  [
                    143.91292211184788,
                    -37.432954633100074
                  ],
                  [
                    143.91263677499052,
                    -37.43287224177261
                  ],
                  [
                    143.91236440797115,
                    -37.43254267550027
                  ],
                  [
                    143.9119882820723,
                    -37.43236759281585
                  ],
                  [
                    143.9116770055037,
                    -37.431842342332935
                  ],
                  [
                    143.9113138494779,
                    -37.43133768643265
                  ],
                  [
                    143.91088584415667,
                    -37.431121404291
                  ],
                  [
                    143.91178076434824,
                    -37.43068883813295
                  ],
                  [
                    143.912533016111,
                    -37.43017387517765
                  ],
                  [
                    143.9128702324257,
                    -37.43061674353025
                  ],
                  [
                    143.9131815090292,
                    -37.431069908446915
                  ],
                  [
                    143.9134927855979,
                    -37.43108020762964
                  ],
                  [
                    143.9136224841884,
                    -37.43137888295225
                  ],
                  [
                    143.9134927855979,
                    -37.43185264140943
                  ],
                  [
                    143.91342793630253,
                    -37.43226460280689
                  ],
                  [
                    143.91319447886735,
                    -37.43234699483094
                  ],
                  [
                    143.91306478027673,
                    -37.432449984698806
                  ],
                  [
                    143.91294805155906,
                    -37.43281044818975
                  ]
                ]
              ]
            ],
            'type': 'MultiPolygon'
          }
        }
      ]
    });

    const state = new GeoJSONQuery('Victoria', {
      "type": "FeatureCollection",
      "features": [
        {
          'id': '21aff45153f64d0f8ed9d8827376b778',
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  140.64697265625,
                  -39.35978526869
                ],
                [
                  150.216064453125,
                  -39.35978526869
                ],
                [
                  150.216064453125,
                  -33.87953701355922
                ],
                [
                  140.64697265625,
                  -33.87953701355922
                ],
                [
                  140.64697265625,
                  -39.35978526869
                ]
              ]
            ]
          }
        }
      ]
    });

    this.sample_queries = [plan1, state];

  }

  ngAfterViewInit() {

  }

  ngOnInit() {

    this.authSubscription = this.auth.loggedIn$
      .subscribe(loggedIn => {
          if (loggedIn) {
            console.log('Getting locally-stored queries.');
            console.log('name for storage is: ' + this.auth.userProfile.name);
            const stored_queries = this.store.get(this.auth.userProfile.name, StorageType.LOCAL);
            console.log(stored_queries);
            if (stored_queries !== undefined) {
              this.queries = stored_queries;
            } else {
              this.queries = this.sample_queries;
            }
          } else {
            console.log('Using default sample queries.');
            this.queries = this.sample_queries;
          }
        }
      );
    console.log(this.queries);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  toggleSelectionOn(gjq: GeoJSONQuery) {
    console.log('Got toggle on!');
    console.log('Selection is now ' + gjq.name);
    this.toggleAllOff();
    gjq.enabled_right = true;
    const gj = gjq.geojson;
    console.log(gj);
    console.log('Setting the selection');
    this.drawing.set(gj);
    this.altdrawing.set(gj);
    this.saveSession();
    console.log('Done.');
  }

  toggleSelectionOff(gjq: GeoJSONQuery) {
    console.log('Got toggle off!');
    gjq.enabled_right = false;
    this.drawing.set(this.emptyGeoJSON);
    this.altdrawing.set(this.emptyGeoJSON);
    // this.drawing.deleteAll().getAll();
    this.saveSession();
    console.log('Done.');
  }

  confirmRemoval(gjq: GeoJSONQuery) {
    this.modalService
      .open(new ConfirmModal('Please confirm removal', 'Are you sure you want to permanently delete ' + gjq.name + '?', 'tiny'))
      .onApprove(() => {
        this.removeGeoJSONQuery(gjq);
        this.saveSession();
      })
      .onDeny(() => {
        console.log('Removal cancelled.');
      });

  }

  confirmUpdate(gjq: GeoJSONQuery) {
    this.modalService
      .open(new ConfirmModal('Please confirm update', 'Are you sure you want to overwrite ' + gjq.name +
        ' with the current boundary?', 'tiny'))
      .onApprove(() => {
        console.log('Updating: ' + gjq.uuid);
        gjq.geojson = this.drawing.getAll();
        this.saveSession();
      })
      .onDeny(() => {
        console.log('Update cancelled.');
      });
  }

  public setGeoJSONQuery(uuid: string, name: string, geojson: any) {
    if (!this.isGeoJSONQuery(uuid)) {
      this.queries.push(new GeoJSONQuery(name, geojson));
    } else {
      this.updateGeoJSONQuery(uuid, name, geojson);
    }
    this.saveSession();
  }


  public updateGeoJSONQuery(uuid, name, geojson) {
    for (let i = 0; i < this.queries.length; i++) {
      if (this.queries[i].uuid === uuid) {
        this.queries[i].name = name;
        this.queries[i].geojson = geojson;
        console.log(this.queries[i].name + ' updated.');
      }
    }
  }

  private saveSession() {
    if (this.auth.authenticated) {
      this.store.set(this.auth.userProfile.name, this.queries, {type: StorageType.LOCAL});
      console.log('Set the session storage.');
    }
  }

  public toggleAllOff() {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].enabled_right = false;
    }
    this.drawing.set(this.emptyGeoJSON);
    this.altdrawing.set(this.emptyGeoJSON);
    this.saveSession();
  }

  public isGeoJSONQuery(name) {
    for (let i = 0; i < this.queries.length; i++) {
      console.log('Checking if: ' + this.queries[i].name + ' == ' + name);
      if (this.queries[i].name === name) {
        return true;
      }
    }
    return false;
  }

  public removeGeoJSONQuery(gjq) {
    this.toggleSelectionOff(gjq);
    this.queries = this.queries.filter(obj => obj !== gjq);
    this.saveSession();
  }

  public insertNewGeoJSONQuery() {
    this.toggleAllOff();
    const new_name = this.generateNewName();
    const editable = new GeoJSONQuery(new_name, this.emptyGeoJSON);
    this.queries.push(editable);
    this.saveSession();
    editable.enabled_right = true;
    this.editname.nativeElement.focus();
    this.editname.nativeElement.select();
  }

  private generateNewName() {
    let new_name = 'New Boundary #0';
    let i = 0;
    while (this.isGeoJSONQuery(new_name)) {
      i += 1;
      new_name = new_name.split('#')[0] + '#' + i;
    }
    return new_name;
  }

  public searchForItem() {
    this.toggleAllOff();
    let i = 0;
    let found = false;
    while (i < this.queries.length && !found) {
      if (this.queries[i].name.toLowerCase().indexOf(this.searchterm.toLowerCase()) !== -1) {
        this.queries[i].enabled_right = true;
        this.editname.nativeElement.focus();
        this.editname.nativeElement.select();
        found = true;
      }
      i++;
    }
  }
}


export class GeoJSONQuery {
  uuid: string;
  name: string;
  geojson: any;
  enabled_left: boolean;
  enabled_right: boolean;

  constructor(name, geojson) {
    this.uuid = UUID.UUID();
    this.name = name;
    this.enabled_left = false;
    this.enabled_right = false;
    this.geojson = geojson;
  }
}
