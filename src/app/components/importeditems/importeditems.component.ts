import {Component, OnInit, ElementRef, ViewChild, Input, Output, AfterViewInit, OnDestroy} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {ModelsService} from '../../services/models.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {ConfirmModal} from '../confirm-modal/confirm-modal.component';
import {PersistenceService, StorageType} from 'angular-persistence';
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
    const plan2 = new GeoJSONQuery('Creswick Sample Boundary', {
      'type': 'FeatureCollection',
      'features': [
        {
          'id': '014d3e96ebafb1de1c22774a47ab3275',
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'coordinates': [
              [
                [
                  144.06698668870644,
                  -37.45771431511489
                ],
                [
                  143.90809686715227,
                  -37.563346123058274
                ],
                [
                  144.14567498127946,
                  -37.61970184870036
                ],
                [
                  144.22587651026043,
                  -37.51535019701112
                ],
                [
                  144.06698668870644,
                  -37.45771431511489
                ]
              ]
            ],
            'type': 'Polygon'
          }
        }
      ]
    });
    const plan3 = new GeoJSONQuery('Creswick Sample Boundary #2', {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'id': '014d3e96ebafb1de1c22774a47ab3276',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [
                  143.87901306152344,
                  -37.47731025619387
                ],
                [
                  143.92810821533203,
                  -37.47731025619387
                ],
                [
                  143.92810821533203,
                  -37.45169472198827
                ],
                [
                  143.87901306152344,
                  -37.45169472198827
                ],
                [
                  143.87901306152344,
                  -37.47731025619387
                ]
              ]
            ]
          }
        }
      ]
    });

    this.sample_queries = [plan1, plan2, plan3];

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

  toggleSelectionOn(q) {
    console.log('Got toggle on!');
    console.log('Selection is now ' + q);
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].enabled_right = this.queries[i].name === q;
      if (this.queries[i].enabled_right) {
        const gj = this.queries[i].geojson;
        console.log(gj);
        console.log('Setting the selection');
        this.drawing.set(gj);
        this.altdrawing.set(gj);
      }
    }
    this.saveSession();
  }

  toggleSelectionOff() {
    console.log('Got toggle off!');
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].enabled_right = false;
    }
    this.drawing.set(this.emptyGeoJSON);
    // this.drawing.deleteAll().getAll();
    this.saveSession();
  }

  confirmRemoval(q) {
    this.modalService
      .open(new ConfirmModal('Please confirm removal', 'Are you sure you want to permanently delete ' + q + '?', 'tiny'))
      .onApprove(() => {
        this.removeGeoJSONQuery(q);
      })
      .onDeny(() => {
        console.log('Removal cancelled.');
      });
  }

  confirmUpdate(q) {
    this.modalService
      .open(new ConfirmModal('Please confirm update', 'Are you sure you want to overwrite ' + q + ' with the current boundary?', 'tiny'))
      .onApprove(() => {
        console.log('Updating: ' + q);
        this.setGeoJSONQuery(q, this.drawing.getAll());
      })
      .onDeny(() => {
        console.log('Update cancelled.');
      });
  }

  public setGeoJSONQuery(name: string, geojson: any) {
    if (!this.isGeoJSONQuery(name)) {
      this.queries.push(new GeoJSONQuery(name, geojson));
    } else {
      this.updateGeoJSONQuery(name, geojson);
    }
    this.saveSession();
  }



  public updateGeoJSONQuery(name, geojson) {
    for (let i = 0; i < this.queries.length; i++) {
      if (this.queries[i].name === name) {
        this.queries[i].geojson = geojson;
        console.log(name + ' updated.');
      }
    }
  }

  private saveSession() {
    if (this.auth.authenticated) {
      this.store.set(this.auth.userProfile.name, this.queries, {type: StorageType.LOCAL});
      console.log('Set the session storage.');
    }
  }

  public getGeoJSONQuery(name) {
    for (let i = 0; i < this.queries.length; i++) {
      if (this.queries[i].name === name) {
        return this.queries[i];
      }
    }
    return false;
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

  public removeGeoJSONQuery(name) {
    let index = -1;
    for (let i = 0; i < this.queries.length; i++) {
      if (this.queries[i].name === name) {
        index = i;
      }
    }
    if (index > -1) {
      if (this.queries[index].enabled_right) {
        this.toggleSelectionOff();
      }
      this.queries.splice(index, 1);
      this.saveSession();
      console.log('Removed: ' + name);
    } else {
      console.log('Can\'t remove; doesn\'t exist.');
    }
  }

  public insertNewGeoJSONQuery() {
    if (this.auth.authenticated) {
      this.toggleSelectionOff();
      const new_name = this.generateNewName();
      const editable = new GeoJSONQuery(new_name, this.emptyGeoJSON);
      this.queries.push(editable);
      this.saveSession();
      editable.enabled_right = true;
      this.editname.nativeElement.focus();
      this.editname.nativeElement.select();
    }
  }

  private generateNewName() {
    let new_name = 'New Boundary';
    let i = 0;
    while (this.isGeoJSONQuery(new_name)) {
      new_name = new_name.split('#')[0] + '#' + i++;
    }
    return new_name;
  }

  public searchForItem() {
    this.toggleSelectionOff();
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
  name: string;
  geojson: any;
  enabled_left: boolean;
  enabled_right: boolean;

  constructor(name, geojson) {
    this.name = name;
    this.enabled_left = false;
    this.enabled_right = false;
    this.geojson = geojson;
  }
}
