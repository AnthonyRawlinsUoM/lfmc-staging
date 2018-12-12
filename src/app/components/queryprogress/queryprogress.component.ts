import {Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList} from '@angular/core';
import {FloristService} from '../../services/florist.service';
import {TimeseriesService} from '../../services/timeseries.service';
import {ModelprogressComponent} from './modelprogress/modelprogress.component';

@Component({
  selector: 'app-queryprogress',
  templateUrl: './queryprogress.component.html',
  styleUrls: ['./queryprogress.component.css']
})
export class QueryprogressComponent implements OnInit {

  @Input() querytasks;
  @Output() cancel = new EventEmitter<any>();
  @ViewChildren(ModelprogressComponent) mps: QueryList<ModelprogressComponent>;

  constructor(private tss: TimeseriesService) {
  }

  ngOnInit() {
    this.q_progress = 0;
  }

  revoke(uuid) {
    this.tss.revoke(uuid);
  }

  abort(uuid) {
    this.tss.abort(uuid);
  }

  progress(uuid) {

    return this.tss.progress(uuid).subscribe(r => {
        if (r.state === 'PENDING') {
          progress = 0;
        } else if (r.state === 'STARTED') {
          progress = 50;
        } else if (r.state === 'SUCCESS') {
          progress = 100;
        }
      },
      (e) => {
        console.log(e);
      },
      () => {
        this_progress = progress;
      });
  }

  cancel_query(uuid) {
    this.tss.revoke(uuid);
    this.cancel.emit();
  }
}
