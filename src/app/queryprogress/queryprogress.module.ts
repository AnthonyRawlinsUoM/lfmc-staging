import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';
import {SuiCheckboxModule} from 'ng2-semantic-ui';
import {ProgressbarComponent} from './modelprogress/progressbar/progressbar.component';
import {QueryprogressComponent} from './queryprogress.component';
import {ProgressionService} from './progression.service';

@NgModule({
  declarations: [ProgressbarComponent, QueryprogressComponent],
  imports: [
    CommonModule,
    SuiModule,
    SuiCheckboxModule
  ],
  exports: [QueryprogressComponent],
  providers: [ProgressionService]
})
export class QueryprogressModule {
}
