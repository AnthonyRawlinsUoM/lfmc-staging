import { Component, OnInit } from '@angular/core';
import {SuiModalService} from 'ng2-semantic-ui';
import {DisclaimationService} from '../../services/disclaimation.service';
import {HttpClient} from '@angular/common/http';
import {ConfirmModal} from '../confirm-modal/confirm-modal.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'lfmc-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  disclaimer_content = '';

  constructor(private modalService: SuiModalService,
              private disclaim: DisclaimationService,
              private http: HttpClient,
              private auth: AuthService) { }

  ngOnInit() {

    if (!this.disclaim.noticed()) {
      this.http.get('assets/files/disclaimer.html', {responseType: 'text'}).subscribe(data => {
        console.log(data);
        this.disclaimer_content = data;
      });
    }
  }

  deny() {
    this.disclaim.decline();
  }

  approve() {
    this.disclaim.acknowledge();
    // if (!this.auth.authenticated) {
    //   this.auth.login();
    // }
  }
}
