import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Landscape Fuel Moisture Condition';
  version = '0.1.5';

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }


}
