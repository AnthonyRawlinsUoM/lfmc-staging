// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { PersistenceModule } from 'angular-persistence';
import { AgmCoreModule } from '@agm/core';
import { SuiModule } from 'ng2-semantic-ui';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MapboxDraw } from '@mapbox/mapbox-gl-draw';
import { ClipboardModule } from 'ngx-clipboard';


// Services
import { ModisService } from './services/modis.service';
import { ModelsService } from './services/models.service';
import { ApiService } from './services/api.service';
import { TsvService } from './services/tsv.service';
import { MapService } from './services/map.service';
import { MapboxUploadAPIS3Service } from './services/mapbox-upload-api-s3.service';
import { AuthService } from './services/auth.service';
import { D3Service } from 'd3-ng2-service';




// Components
import { AppComponent } from './app.component';
import { HelpComponent } from './components/help/help.component';
import { OptionsComponent } from './components/options/options.component';
import { ContributeComponent } from './components/contribute/contribute.component';
import { LayerMapComponent } from './components/layer-map/layer-map.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { D3mapComponent } from './shared/d3map/d3map.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MapboxComponent } from './shared/mapbox/mapbox.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadComponent } from './components/upload/upload.component';
import { ModelsComponent } from './components/models/models.component';
import { ModelviewComponent } from './components/modelview/modelview.component';
import { ImportjobsComponent } from './components/importjobs/importjobs.component';
import { ImporttasksComponent } from './components/importtasks/importtasks.component';
import { FullscreenComponent } from './components/fullscreen/fullscreen.component';
import { SearchresultsComponent } from './components/searchresults/searchresults.component';
import { DatasourcesComponent } from './components/datasources/datasources.component';
import { ConfirmModal, ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { LegendComponent } from './components/legend/legend.component';
import { AgmComponent } from './shared/agm/agm.component';
import { ChartingComponent } from './components/charting/charting.component';
import { FilesaverComponent } from './shared/filesaver/filesaver.component';



const appRoutes: Routes = [
  {path:'', component:HomeComponent },
  {path:'home', component:HomeComponent },
  {path:'profile', component:ProfileComponent },
  {path:'help', component:HelpComponent },
  {path:'options', component:OptionsComponent },
  {path:'contribute', component:ContributeComponent },
  {path:'models', component:ModelsComponent },
  {path:'fullscreen', component:FullscreenComponent },
  {path: 'callback', component: CallbackComponent }
  //,
  //{path: '**', redirectTo: '' }
];

@NgModule({

  entryComponents:[
    ConfirmModalComponent
  ],

  // Components
  declarations: [
    AppComponent,
    HelpComponent,
    OptionsComponent,
    ContributeComponent,
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
    ImporttasksComponent,
    FullscreenComponent,
    SearchresultsComponent,
    DatasourcesComponent,
    ConfirmModalComponent,
    LegendComponent,
    AgmComponent,
    ChartingComponent,
    FilesaverComponent
  ],

  // Modules
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    PersistenceModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FileUploadModule,
    SuiModule,
    NgxChartsModule,
		ClipboardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxVm7cOOIMVDj6SPcj3lp0S_S2-T7mDFw'
    })
  ],

  // Services
  providers: [
    MapService,
    ModisService,
    AuthService,
    ModelsService,
    ApiService,
    MapboxUploadAPIS3Service,
    D3Service,
    TsvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
