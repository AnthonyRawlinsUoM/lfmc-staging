import {Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import {ProgressionService} from './progression.service';

@Component({
  selector: 'app-queryprogress',
  templateUrl: './queryprogress.component.html',
  styleUrls: ['./queryprogress.component.css']
})
export class QueryprogressComponent implements OnInit {

  subtasks: any = [];
  isDimmed = false;
  multi = [];

  overall_progress = 0;

  @ViewChild('group') group: ElementRef;
  @ContentChildren(QueryprogressComponent) rows: QueryList<QueryprogressComponent>;

  @Output() newQuery: EventEmitter<any> = new EventEmitter<any>();

  @Output() queueStartEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() queueStopEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() queueComplete: EventEmitter<any> = new EventEmitter<any>();

  @Input() query_params: any;

  constructor(private prog: ProgressionService) {
  }

  ngOnInit() {
  }

  test() {
    this.multi = [];
    const example_query = {
      'geo_json': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'Polygon',
              'coordinates': [
                [
                  [
                    148.42529296875,
                    -37.42252593456306
                  ],
                  [
                    148.68896484375,
                    -37.42252593456306
                  ],
                  [
                    148.68896484375,
                    -37.256566086115214
                  ],
                  [
                    148.42529296875,
                    -37.256566086115214
                  ],
                  [
                    148.42529296875,
                    -37.42252593456306
                  ]
                ]
              ]
            }
          }
        ]
      },
      'start': '2018-11-20',
      'finish': '2018-11-22',
      'hashkey': 'test',
      'models': 'DFMC,AWRA-L-R,AWRA-L-L,FFDI'
    };

    this.prog.submit(example_query).subscribe((j) => {
        console.log(j);
        this.subtasks = j;
      },
      (e) => console.log('Error: ' + e.message),
      () => {
        this.subtasks.map(a => this.newQuery.emit(a));
      });

    this.newQuery.subscribe((u) => {
        console.log(u);
      }, (e) => {
      }, () => {

      }
    );
  }

  doQuery(json_query) {
    this.multi = [];

    this.prog.submit(json_query).subscribe((j) => {
        console.log(j);
        this.subtasks = j;
      },
      (e) => console.log('Error: ' + e.message),
      () => {
        this.subtasks.map(a => this.newQuery.emit(a));
      });

    this.newQuery.subscribe((u) => {
        console.log(u);
      }, (e) => {
      }, () => {

      }
    );
  }

  onComplete(res) {

    this.multi.push(res);
    // console.log(this.multi);
    if (this.multi.length === this.subtasks.length) {
      console.log('ALL Tasks complete!');
      this.queueComplete.emit(this.multi);
    }
  }

  go() {
    this.queueStartEvent.emit();
  }

  stop() {
    this.queueStopEvent.emit();
  }

  cancel() {

  }
}
