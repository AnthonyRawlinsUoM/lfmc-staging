import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModelsService, Model, ModelMetaData, ModelOutputs, ModelParameters} from '../../services/models.service';
import {ConfirmModal} from '../confirm-modal/confirm-modal.component';
import {SuiModalService} from 'ng2-semantic-ui';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit, AfterViewInit {
  models: Model[];

  constructor(private ms: ModelsService,
              private modalService: SuiModalService) {
  }

  ngOnInit() {
    this.ms.getModels().subscribe(m => {
      this.models = m;
    });
    console.log(this.models);
  }

  ngAfterViewInit() {
    this.ms.getModels().subscribe(result => {
        this.models = <Model[]>(result.models);
      },
      (e) => {
        console.log(e);
        this.modalService.open(new ConfirmModal('Error', 'While retrieving the list of models: ' + e + 'Notify webmaster?', 'tiny'))
          .onApprove(() => {
            // Notify the webmaster here...
          })
          .onDeny(() => {
            // Don't send bug reports...
          });
      },
      () => {
          console.log('finished loading models.');
      });
  }
}
