import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProgressionService} from '../../progression.service';
import {Form} from '@angular/forms';
import {delay} from 'rxjs/internal/operators';

@Component({
  selector: '[model-progress]',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit, AfterViewInit {

  @Input() uuid: string;
  @Input() doStart: any;
  @Input() doStop: any;

  @Output() progress: EventEmitter<number> = new EventEmitter<number>();
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  actionDisabled = false;
  trashDisabled = true;

  p: any = {'state': 'PENDING'};
  progression = 0;
  result: any;
  ptime = 0;

  public taskActive = true;
  public taskDisabled = false;
  private timeseries: Object;

  constructor(private prog: ProgressionService) {
  }

  ngOnInit() {
    console.log('Init called on ProgressBarComponent');
    console.log('UUID is: ' + this.uuid);
  }

  ngAfterViewInit() {
    console.log('AfterViewInit called on ProgressBarComponent');
    this.retry();
  }

  public retry() {
    if (this.taskActive) {
      this.prog.getProgress(this.uuid).subscribe(
        (d) => {

          console.log(d);
          this.p = d;
          console.log('P State is: ' + this.p.state);

          if (this.p.state === 'PENDING') {
            this.progression = 10;
            this.ptime = this.p.timestamp - this.p.started;

          } else if (this.p.state === 'STARTED') {
            this.progression = 50;
            this.ptime = this.p.timestamp - this.p.started;

          } else if (this.p.state === 'SUCCESS') {
            this.progression = 100;
            this.ptime = this.p.timestamp - this.p.started;
            this.actionDisabled = true;
            this.trashDisabled = false;

          } else if (this.p.state === 'FAILURE') {
            this.progression = 100;
            this.ptime = this.p.timestamp - this.p.started;
            this.actionDisabled = true;
            this.trashDisabled = false;

          } else if (this.p.state === 'REVOKED') {
            this.progression = 0;
            this.actionDisabled = true;
            this.trashDisabled = false;

          } else if (this.p.state === 'ABORTED') {
            this.progression = 0;
            this.actionDisabled = true;
            this.trashDisabled = false;
          }
          this.progress.emit(this.progression);
        },
        (e) => {
          console.log(e);
        },
        () => {
          if (this.p.state === 'SUCCESS') {
            console.log('Progress for ' + this.uuid + ' has completed.');

            this.prog.getResult(this.uuid)
              .subscribe((n) => {
                this.timeseries = n;
                },
              (e) => {
                console.log(e);
              },
              () => {
                console.log(this.timeseries);
                this.complete.emit(this.timeseries);
              });

          } else if (this.p.state === 'PENDING' || this.p.state === 'STARTED') {
            this.delay(1000).then(() => {
              this.retry(); // TODO - Observable WebSocket instead of polling.
            });
          }
        }
      );
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  abort(uuid) {
    this.prog.abort(uuid).subscribe();
  }

  revoke(uuid) {
    this.prog.revoke(uuid).subscribe();
  }

}
