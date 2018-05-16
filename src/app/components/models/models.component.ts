import {Component, OnInit} from '@angular/core';
import {NosqlService} from '../../services/nosql.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models: any[] = [];

  constructor(private ns: NosqlService) {
  }

  ngOnInit() {
    this.ns.get('/models').subscribe(m => this.models = m);
  }
}
