import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

declare var jQuery: any;

@Component({
  selector: 'lfmc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fuel Moisture v1';

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  onToggle() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  }

}
