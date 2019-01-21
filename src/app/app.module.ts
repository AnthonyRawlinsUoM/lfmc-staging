// Modules
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PersistenceModule} from 'angular-persistence';
import {SuiModule} from 'ng2-semantic-ui';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MapboxDraw} from '@mapbox/mapbox-gl-draw';
import {ClipboardModule} from 'ngx-clipboard';
import {QueryprogressModule} from './queryprogress/queryprogress.module';

// Services
import {ModelsService} from './services/models.service';
import {TimeseriesService} from './services/timeseries.service';
import {ErrorReportingService} from './services/error-reporting.service';
import {NosqlService} from './services/nosql.service';
import {MapService} from './services/map.service';
import {MapboxUploadAPIS3Service} from './services/mapbox-upload-api-s3.service';
import {AuthService} from './services/auth.service';
import {DisclaimationService} from './services/disclaimation.service';
import {D3Service} from 'd3-ng2-service';
import {CookieService} from 'ngx-cookie-service';

// Components
import {AppComponent} from './app.component';
import {HelpComponent} from './components/help/help.component';
import {OptionsComponent} from './components/options/options.component';
import {ImportComponent} from './components/import/import.component';
import {LayerMapComponent} from './components/layer-map/layer-map.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {D3mapComponent} from './shared/d3map/d3map.component';
import {CallbackComponent} from './components/callback/callback.component';
import {ProfileComponent} from './components/profile/profile.component';
import {HomeComponent} from './components/home/home.component';
import {MapboxComponent} from './shared/mapbox/mapbox.component';
import {FooterComponent} from './components/footer/footer.component';
import {UploadComponent} from './components/upload/upload.component';
import {ModelsComponent} from './components/models/models.component';
import {ModelviewComponent} from './components/modelview/modelview.component';
import {ImportjobsComponent} from './components/importjobs/importjobs.component';
import {ImportedItemsComponent} from './components/importeditems/importeditems.component';
import {FullscreenComponent} from './components/fullscreen/fullscreen.component';
import {SearchresultsComponent} from './components/searchresults/searchresults.component';
import {DatasourcesComponent} from './components/datasources/datasources.component';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {LegendComponent} from './components/legend/legend.component';
import {ChartingComponent} from './components/charting/charting.component';
import {VideoComponent} from './components/video/video.component';
import {ServerlogComponent} from './components/serverlog/serverlog.component';

import {BarGroupComponent} from './availability/temporal-availability/bar-group/bar-group.component';
import {IndicatorBarComponent} from './availability/temporal-availability/indicator-bar/indicator-bar.component';
import {AvailabilityRowComponent} from './availability/temporal-availability/availability-row/availability-row.component';
import {TemporalAvailabilityComponent} from './availability/temporal-availability/temporal-availability.component';
import {DisclaimerComponent} from './components/disclaimer/disclaimer.component';
import {RangeSelectorComponent} from './components/range-selector/range-selector.component';
import { jqxBarGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbargauge';
import { jqxRangeSelectorComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxrangeselector';
import { TimeBarComponent } from './timescope/time-bar/time-bar.component';


// import {QueryprogressComponent} from './components/queryprogress/queryprogress.component';
// import { ModelprogressComponent } from './components/queryprogress/modelprogress/modelprogress.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  // {path: 'help', component: HelpComponent},
  // {path: 'options', component: OptionsComponent},
  {path: 'import', component: ImportComponent},
  {path: 'models', component: ModelsComponent},
  {path: 'callback', component: CallbackComponent}

];

@NgModule({

  entryComponents: [
    ConfirmModalComponent
  ],

  // Components
  declarations: [
    AppComponent,
    HelpComponent,
    OptionsComponent,
    ImportComponent,
    LayerMapComponent,
    ToolbarComponent,
    D3mapComponent,
    CallbackComponent,
    ProfileComponent,
    HomeComponent,
    MapboxComponent,
    FooterComponent,
    UploadComponent,
    ModelsComponent,
    ModelviewComponent,
    ImportjobsComponent,
    ImportedItemsComponent,
    FullscreenComponent,
    SearchresultsComponent,
    DatasourcesComponent,
    ConfirmModalComponent,
    LegendComponent,
    ChartingComponent,
    VideoComponent,
    ServerlogComponent,
    BarGroupComponent,
    IndicatorBarComponent,
    AvailabilityRowComponent,
    TemporalAvailabilityComponent,
    DisclaimerComponent,
    // QueryprogressComponent,
    // ModelprogressComponent
    RangeSelectorComponent,
    jqxRangeSelectorComponent,
    jqxBarGaugeComponent,
    TimeBarComponent
  ],

  // Modules
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PersistenceModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FileUploadModule,
    SuiModule,
    NgxChartsModule,
    ClipboardModule,
    QueryprogressModule
  ],

  // Services
  providers: [
    MapService,
    AuthService,
    ModelsService,
    TimeseriesService,
    ErrorReportingService,
    MapboxUploadAPIS3Service,
    D3Service,
    NosqlService,
    DisclaimationService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
