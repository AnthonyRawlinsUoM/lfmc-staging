import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { environment } from '../environments/environment';
import {DisclaimationService} from './services/disclaimation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Landscape Fuel Moisture Condition';
  public version: string = environment.VERSION;
  public disclaimer_acknowledged;

  constructor(private auth: AuthService,
              private disclaim: DisclaimationService) {

    this.disclaimer_acknowledged = this.disclaim.noticed();
  }
}
