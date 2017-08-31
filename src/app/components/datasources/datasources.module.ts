import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasourcesComponent } from './datasources.component';
import { TimestampPipe } from './timestamp.pipe';

@NgModule({
  declarations: [ DatasourcesComponent, TimestampPipe ],
  exports: [ DatasourcesComponent ],
  imports: [ CommonModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class DatasourcesModule {}
