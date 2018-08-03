import {Injectable, OnInit} from '@angular/core';
import {PersistenceService, StorageType} from 'angular-persistence';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DisclaimationService implements OnInit {


  acknowledged = 'UNKNOWN';

  constructor(private cookieJar: CookieService) {
    if (!this.cookieJar.check('LFMC_disclaimer')) {
      this.persist();
    }
  }

  ngOnInit(): void {
    // this.store.createContainer('LFMC_disclaimer_acknowledgement', StorageType.LOCAL);

    this.acknowledged = this.cookieJar.get('LFMC_disclaimer');
  }

  public noticed() {
    return (this.cookieJar.get('LFMC_disclaimer') === 'TRUE');
  }

  public acknowledge() {
    this.acknowledged = 'TRUE';
    this.persist();
  }

  public decline() {
    this.acknowledged = 'FALSE';
    this.persist();
  }

  private persist() {
    // Use PersistenceService to store cookie here
    this.cookieJar.set('LFMC_disclaimer', this.acknowledged);
  }
}
