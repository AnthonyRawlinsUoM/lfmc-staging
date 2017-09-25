import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'lfmc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Landscape Fuel Moisture Condition v0.1';

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }


}
