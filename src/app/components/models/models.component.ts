import {Component, OnInit} from '@angular/core';
import {ModelsService} from '../../services/models.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models: any[] = [];

  constructor(private ms: ModelsService) {
  }

  ngOnInit() {
    this.ms.get('models').subscribe(m => this.models = m.models);
  }
}
