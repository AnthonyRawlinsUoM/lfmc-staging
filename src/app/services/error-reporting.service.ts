import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';
import { SuiModalService } from 'ng2-semantic-ui';
import { environment } from '../../environments/environment';
import { ConfirmModal } from '../components/confirm-modal/confirm-modal.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable()
export class ErrorReportingService {
  constructor(private http: HttpClient,
              private sms: SuiModalService) {
  }

  private apiURL = 'https://pipeline.landscapefuelmoisture.bushfirebehaviour.net.au/errorlogger';
  private metadata = 'LFMC API v' + environment.VERSION;

  notifyAuthorOfError(error: any) {
    const now = moment().format('LLLL');
    console.log(`${this.apiURL}`);
    error.time_of_report = now;
    error.metadata = this.metadata;
    console.log(error);
    this.http.post(this.apiURL, error, httpOptions)
      .subscribe(() => {
        console.log('Error report submitting...');
        },
      (err) => {
        console.log(err);
        this.sms.open(new ConfirmModal('Another Error occurred!',
          'A further error occurred trying to lodge the error report. ' + err, 'tiny'));
      },
      () => {
        console.log('Error report submitted.');
      });
  }
}
