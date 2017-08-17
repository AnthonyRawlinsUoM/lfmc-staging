import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { PersistenceModule } from 'angular-persistence';
import { AgmCoreModule } from '@agm/core';
import { SuiModule } from 'ng2-semantic-ui';
// import  { MapboxGeocoderModule } from '@mapbox/mapbox-gl-geocoder';


// Services
import { ModisService } from './services/modis.service';
import { MapService } from './services/map.service';
import { MapboxUploadAPIS3Service } from './services/mapbox-upload-api-s3.service';

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
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MapboxComponent } from './shared/mapbox/mapbox.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadComponent } from './components/upload/upload.component';


import { FileUploadModule } from 'ng2-file-upload';

const appRoutes: Routes = [
  {path:'', component:HomeComponent },
  {path:'home', component:HomeComponent },
  {path:'profile', component:ProfileComponent },
  {path:'help', component:HelpComponent },
  {path:'options', component:OptionsComponent },
  {path:'contribute', component:ContributeComponent },
  {path:'layers', component:LayerMapComponent },
  {path: 'callback', component: CallbackComponent }
  //,
  //{path: '**', redirectTo: '' }
]

@NgModule({

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
    UploadComponent
  ],

  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PersistenceModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FileUploadModule,
    SuiModule,
    // MapboxGeocoderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxVm7cOOIMVDj6SPcj3lp0S_S2-T7mDFw'
    })
  ],

  // Services
  providers: [
    MapService,
    ModisService,
    AuthService,
    MapboxUploadAPIS3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
