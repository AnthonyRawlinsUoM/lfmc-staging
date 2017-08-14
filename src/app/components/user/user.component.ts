import { Component, OnInit } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';

@Component({
  selector: 'lfmc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private store: PersistenceService) { }

  ngOnInit() {
    this.store.set('test', 'success', {type: StorageType.SESSION});
  }

}
