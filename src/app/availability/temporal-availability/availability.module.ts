import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarGroupComponent} from './bar-group/bar-group.component';
import {IndicatorBarComponent} from './indicator-bar/indicator-bar.component';
import {AvailabilityRowComponent} from './availability-row/availability-row.component';
import {TemporalAvailabilityComponent} from './temporal-availability.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BarGroupComponent, IndicatorBarComponent, AvailabilityRowComponent, TemporalAvailabilityComponent],
  exports: [TemporalAvailabilityComponent, AvailabilityRowComponent, BarGroupComponent, IndicatorBarComponent]
})
export class AvailabilityModule {
}
