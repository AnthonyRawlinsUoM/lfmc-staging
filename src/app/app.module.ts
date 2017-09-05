// Modules
import { BrowserModule } from '@angular/platform-browser';
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


// Services
import { ModisService } from './services/modis.service';
import { ModelsService } from './services/models.service';
import { DatasourcesService } from './services/datasources.service';
import { MapService } from './services/map.service';
import { MapboxUploadAPIS3Service } from './services/mapbox-upload-api-s3.service';
import { AuthService } from './services/auth.service';





// Components
import { AppComponent } from './app.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { HelpComponent } from './components/help/help.component';
import { OptionsComponent } from './components/options/options.component';
import { ContributeComponent } from './components/contribute/contribute.component';
import { BasicMapComponent } from './components/basic-map/basic-map.component';
import { LayerMapComponent } from './components/layer-map/layer-map.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { D3mapComponent } from './shared/d3map/d3map.component';
import { TimelineComponent } from './components/timeline/timeline.component';
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
import { D3chartComponent } from './shared/d3chart/d3chart.component';
import { LegendComponent } from './components/legend/legend.component';
import { AgmComponent } from './shared/agm/agm.component';


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
]

@NgModule({

  entryComponents:[
    ConfirmModalComponent
  ],

  // Components
  declarations: [
    AppComponent,
    BarchartComponent,
    HelpComponent,
    OptionsComponent,
    ContributeComponent,
    BasicMapComponent,
    LayerMapComponent,
    ToolbarComponent,
    D3mapComponent,
    TimelineComponent,
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
    D3chartComponent,
    LegendComponent,
    AgmComponent
  ],

  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    PersistenceModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FileUploadModule,
    SuiModule,
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
    DatasourcesService,
    MapboxUploadAPIS3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
