import {Component, Input, Output, OnInit} from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {PersistenceService, StorageType} from 'angular-persistence';
import { UserProfile } from '../../services/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: UserProfile;

  constructor(private store: PersistenceService, public auth: AuthService) {
  }

  ngOnInit() {
      if (this.auth.authenticated) {
        this.profile = this.auth.userProfile;
        console.log('This profile is: ' + this.profile);
      }
      this.store.set('test', 'success', {type: StorageType.LOCAL});
  }


}