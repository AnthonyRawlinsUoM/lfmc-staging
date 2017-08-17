import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PersistenceService, StorageType } from 'angular-persistence';

@Component({
  selector: 'lfmc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(private store: PersistenceService, public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
      this.store.set('test', 'success', {type: StorageType.SESSION});
    }
  }

}
