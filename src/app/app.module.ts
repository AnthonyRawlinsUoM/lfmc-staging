import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// import { MapBoxModule } from 'mapbox-gl-js/dist/mapbox-gl-js';

import { AgmCoreModule } from '@agm/core';
//import  { MapBoxModule } from '@mapbox/mapbox-gl-draw';


// Services
import { ModisService } from './services/modis.service'
import { MapService } from './services/map.service'

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
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

const appRoutes: Routes = [
  {path:'', component:HomeComponent },
  {path:'home', component:HomeComponent },
  {path:'profile', component:ProfileComponent },
  {path:'help', component:HelpComponent },
  {path:'options', component:OptionsComponent },
  {path:'contribute', component:ContributeComponent },
  {path:'layers', component:LayerMapComponent },
  {path: 'callback', component: CallbackComponent },
  {path: '**', redirectTo: '' }
]

@NgModule({

  // Components
  declarations: [
    AppComponent,
    UserComponent,
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
    MapboxComponent
  ],

  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxVm7cOOIMVDj6SPcj3lp0S_S2-T7mDFw'
    })
/*   , MapBoxModule.forRoot(
      "pk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o1dm81NTIwMDN6MTJxbjlvOHBiNHd1OSJ9.1t8I4sU0ceA6N8Tnnmx2ig"
    )*/
  ],

  // Services
  providers: [
    MapService,
    ModisService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
