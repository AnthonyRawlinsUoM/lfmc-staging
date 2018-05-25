import {Component, OnInit} from '@angular/core';
import {ModelsService, Model} from '../../services/models.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models: Model[] = [];

  constructor(private ms: ModelsService) {
  }

  ngOnInit() {
    this.ms.getModels().subscribe(m => this.models = m);
  }
}
