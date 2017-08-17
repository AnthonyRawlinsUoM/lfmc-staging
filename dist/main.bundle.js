webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ui.menu {\n  margin-bottom: 0rem;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Following Menu -->\n<div class=\"ui inverted large top pointing menu transition\">\n  <div class=\"ui container\">\n    <a class=\"item\" [routerLinkActive]=\"['active']\" routerLink=\"/home\">\n        <i class=\"home icon\"></i>\n  Home\n  </a>\n    <a class=\"item\" [routerLinkActive]=\"['active']\" routerLink=\"/layers\">\n  <i class=\"map outline icon\"></i>Layers\n  </a>\n    <a class=\"item\" [routerLinkActive]=\"['active']\" routerLink=\"/contribute\">\n  <i class=\"marker icon\"></i>Contribute\n  </a>\n    <a class=\"item\" [routerLinkActive]=\"['active']\" routerLink=\"/options\">\n  <i class=\"options icon\"></i>Options\n  </a>\n    <a class=\"item\" [routerLinkActive]=\"['active']\" routerLink=\"/help\">\n  <i class=\"help icon\"></i>Help\n  </a>\n\n    <div class=\"right menu\">\n      <div class=\"item\">\n        <div class=\"ui transparent icon input\">\n          <input type=\"text\" placeholder=\"Search...\">\n          <i class=\"inverted search link icon\"></i>\n        </div>\n      </div>\n      <a class=\"item\" [routerLinkActive]=\"['active']\" *ngIf=\"auth.isAuthenticated()\" routerLink=\"/profile\">\n      <i class=\"user circle icon\"></i>\n      Profile\n    </a>\n      <a class=\"item\" *ngIf=\"!auth.isAuthenticated()\" (click)=\"auth.login()\">\n    <i class=\"enter icon\"></i>Login\n    </a>\n      <a class=\"item\" *ngIf=\"auth.isAuthenticated()\" (click)=\"auth.logout()\">\n      <i class=\"exit icon\"></i>Logout\n    </a>\n    </div>\n  </div>\n</div>\n\n<!-- Page Contents -->\n<div class=\"pusher\">\n  <div class=\"ui\">\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n  </div>\n  <lfmc-footer></lfmc-footer>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(auth) {
        this.auth = auth;
        this.title = 'Landscape Fuel Moisture Condition v1';
        auth.handleAuthentication();
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_persistence__ = __webpack_require__("../../../../angular-persistence/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_semantic_ui__ = __webpack_require__("../../../../ng2-semantic-ui/dist/public.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_modis_service__ = __webpack_require__("../../../../../src/app/services/modis.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_map_service__ = __webpack_require__("../../../../../src/app/services/map.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_mapbox_upload_api_s3_service__ = __webpack_require__("../../../../../src/app/services/mapbox-upload-api-s3.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_barchart_barchart_component__ = __webpack_require__("../../../../../src/app/shared/barchart/barchart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_help_help_component__ = __webpack_require__("../../../../../src/app/components/help/help.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_options_options_component__ = __webpack_require__("../../../../../src/app/components/options/options.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_contribute_contribute_component__ = __webpack_require__("../../../../../src/app/components/contribute/contribute.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_basic_map_basic_map_component__ = __webpack_require__("../../../../../src/app/components/basic-map/basic-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_layer_map_layer_map_component__ = __webpack_require__("../../../../../src/app/components/layer-map/layer-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_toolbar_toolbar_component__ = __webpack_require__("../../../../../src/app/components/toolbar/toolbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__shared_d3map_d3map_component__ = __webpack_require__("../../../../../src/app/shared/d3map/d3map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_timeline_timeline_component__ = __webpack_require__("../../../../../src/app/components/timeline/timeline.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_callback_callback_component__ = __webpack_require__("../../../../../src/app/components/callback/callback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_profile_profile_component__ = __webpack_require__("../../../../../src/app/components/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_home_home_component__ = __webpack_require__("../../../../../src/app/components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__shared_mapbox_mapbox_component__ = __webpack_require__("../../../../../src/app/shared/mapbox/mapbox.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_footer_footer_component__ = __webpack_require__("../../../../../src/app/components/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_upload_upload_component__ = __webpack_require__("../../../../../src/app/components/upload/upload.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_ng2_file_upload__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// import  { MapboxGeocoderModule } from '@mapbox/mapbox-gl-geocoder';
// Services



// Components


















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_24__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_24__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_23__components_profile_profile_component__["a" /* ProfileComponent */] },
    { path: 'help', component: __WEBPACK_IMPORTED_MODULE_13__components_help_help_component__["a" /* HelpComponent */] },
    { path: 'options', component: __WEBPACK_IMPORTED_MODULE_14__components_options_options_component__["a" /* OptionsComponent */] },
    { path: 'contribute', component: __WEBPACK_IMPORTED_MODULE_15__components_contribute_contribute_component__["a" /* ContributeComponent */] },
    { path: 'layers', component: __WEBPACK_IMPORTED_MODULE_17__components_layer_map_layer_map_component__["a" /* LayerMapComponent */] },
    { path: 'callback', component: __WEBPACK_IMPORTED_MODULE_21__components_callback_callback_component__["a" /* CallbackComponent */] }
    //,
    //{path: '**', redirectTo: '' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        // Components
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__shared_barchart_barchart_component__["a" /* BarchartComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_help_help_component__["a" /* HelpComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_options_options_component__["a" /* OptionsComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_contribute_contribute_component__["a" /* ContributeComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_basic_map_basic_map_component__["a" /* BasicMapComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_layer_map_layer_map_component__["a" /* LayerMapComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_toolbar_toolbar_component__["a" /* ToolbarComponent */],
            __WEBPACK_IMPORTED_MODULE_19__shared_d3map_d3map_component__["a" /* D3mapComponent */],
            __WEBPACK_IMPORTED_MODULE_20__components_timeline_timeline_component__["a" /* TimelineComponent */],
            __WEBPACK_IMPORTED_MODULE_21__components_callback_callback_component__["a" /* CallbackComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_24__components_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_25__shared_mapbox_mapbox_component__["a" /* MapboxComponent */],
            __WEBPACK_IMPORTED_MODULE_26__components_footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_27__components_upload_upload_component__["a" /* UploadComponent */]
        ],
        // Modules
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5_angular_persistence__["a" /* PersistenceModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_28_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_7_ng2_semantic_ui__["a" /* SuiModule */],
            // MapboxGeocoderModule,
            __WEBPACK_IMPORTED_MODULE_6__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyDxVm7cOOIMVDj6SPcj3lp0S_S2-T7mDFw'
            })
        ],
        // Services
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__services_map_service__["a" /* MapService */],
            __WEBPACK_IMPORTED_MODULE_8__services_modis_service__["a" /* ModisService */],
            __WEBPACK_IMPORTED_MODULE_22__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_10__services_mapbox_upload_api_s3_service__["a" /* MapboxUploadAPIS3Service */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/basic-map/basic-map.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#mapbox {\n  position: absolute;\n  top: auto;\n  bottom: 0;\n  width: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/basic-map/basic-map.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"mymap\" class=\"ui inverted vertical masthead center aligned segment map\">\n<lfmc-mapbox></lfmc-mapbox>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/basic-map/basic-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_persistence__ = __webpack_require__("../../../../angular-persistence/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// mapboxgl.accessToken = "";
// const MapGL = mapboxgl.Map;
var BasicMapComponent = (function () {
    // mapbox: mapboxgl.MapGL;
    function BasicMapComponent(storage) {
        this.storage = storage;
        // defaults
        this.lat = -38.6217134;
        this.lng = 143.5564043;
        this.zoom = 2;
        this.mapPrefs = this.storage;
    }
    BasicMapComponent.prototype.ngOnInit = function () {
        if (this.mapPrefs.get('test'))
            console.log('works!');
        this.mapPrefs.set('lat', this.lat, { type: __WEBPACK_IMPORTED_MODULE_1_angular_persistence__["c" /* StorageType */].SESSION });
        this.mapPrefs.set('lng', this.lng, { type: __WEBPACK_IMPORTED_MODULE_1_angular_persistence__["c" /* StorageType */].SESSION });
        this.mapPrefs.set('zoom', this.zoom, { type: __WEBPACK_IMPORTED_MODULE_1_angular_persistence__["c" /* StorageType */].SESSION });
    };
    return BasicMapComponent;
}());
BasicMapComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-basic-map',
        template: __webpack_require__("../../../../../src/app/components/basic-map/basic-map.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/basic-map/basic-map.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular_persistence__["b" /* PersistenceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular_persistence__["b" /* PersistenceService */]) === "function" && _a || Object])
], BasicMapComponent);

var _a;
//# sourceMappingURL=basic-map.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/callback/callback.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loading {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 100vh;\n  width: 100vw;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #fff;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/callback/callback.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui active dimmer\">\n  <div class=\"ui text loader\">Loading</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/callback/callback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CallbackComponent = (function () {
    function CallbackComponent() {
    }
    CallbackComponent.prototype.ngOnInit = function () {
    };
    return CallbackComponent;
}());
CallbackComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-callback',
        template: __webpack_require__("../../../../../src/app/components/callback/callback.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/callback/callback.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CallbackComponent);

//# sourceMappingURL=callback.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/contribute/contribute.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/contribute/contribute.component.html":
/***/ (function(module, exports) {

module.exports = "<lfmc-upload></lfmc-upload>\n"

/***/ }),

/***/ "../../../../../src/app/components/contribute/contribute.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContributeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ContributeComponent = (function () {
    function ContributeComponent() {
    }
    ContributeComponent.prototype.ngOnInit = function () {
    };
    return ContributeComponent;
}());
ContributeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-contribute',
        template: __webpack_require__("../../../../../src/app/components/contribute/contribute.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/contribute/contribute.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ContributeComponent);

//# sourceMappingURL=contribute.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/footer/footer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".footer.segment {\n  margin-top: 2rem;\n  margin-bottom: 0em;\n  padding-top: 5rem;\n  padding-bottom: 5rem;\n  background-color: rgb(36,36,36);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui inverted vertical footer segment\">\n  <div class=\"ui container\">\n    <div class=\"ui stackable inverted divided equal height stackable padded grid\">\n      <div class=\"seven wide column\">\n        <h4 class=\"ui inverted header\">About</h4>\n        <p>Developed by the <a href=\"http://unimelb.edu.au\">University of Melbourne</a> in collaboration with <a href=\"https://delwp.vic.gov.au/\">The Department of Environment, Land, and Water Planning</a>.</p>\n        <h5>Accessibility</h5>\n        <p>This site is designed to meet the <a href=\"www.w3.org/TR/WCAG20/\">Web content accessibility guidelines version 2.0</a> (WCAG 2.0) Standard.</p>\n        <p class=\"copyright\">&copy; (2017) University of Melbourne.</p>\n      </div>\n      <div class=\"three wide column\">\n        <h4 class=\"ui inverted header\">Supported by:</h4>\n        <ul>\n        <li><a href=\"https://education.gov.au/national-collaboration-research-infrastructure-strategy-ncris\">NCRIS</a></li>\n        <li><a href=\"http://nectar.org.au/\">NeCTAR</a></li>\n        <li><a href=\"http://rds.edu.au\">RDS</a></li>\n      </ul>\n      </div>\n      <div class=\"three wide column\">\n        <h4 class=\"ui inverted header\">Contact</h4>\n        <p><a href=\"mailto:anthony.rawlins@unimelb.edu.au\">Webmaster</a></p>\n      </div>\n    </div>\n  </div>\n  <div class=\"ui container equal height grid\">\n    <div class=\"column\">\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-footer',
        template: __webpack_require__("../../../../../src/app/components/footer/footer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/footer/footer.component.css")]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/help/help.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/help/help.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  help works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/help/help.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HelpComponent = (function () {
    function HelpComponent() {
    }
    HelpComponent.prototype.ngOnInit = function () {
    };
    return HelpComponent;
}());
HelpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-help',
        template: __webpack_require__("../../../../../src/app/components/help/help.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/help/help.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HelpComponent);

//# sourceMappingURL=help.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".hidden.menu {\n     display: none;\n   }\n\n   .masthead.segment {\n     min-height: 700px;\n     padding: 1em 0em;\n   }\n   .masthead .logo.item img {\n     margin-right: 1em;\n   }\n   .masthead .ui.menu .ui.button {\n     margin-left: 0.5em;\n   }\n   .masthead h1.ui.header {\n     margin-top: 3em;\n     margin-bottom: 0em;\n     font-size: 4em;\n     font-weight: normal;\n   }\n   .masthead h2 {\n     font-size: 1.7em;\n     font-weight: normal;\n   }\n\n   .ui.vertical.stripe {\n     padding: 8em 0em;\n   }\n   .ui.vertical.stripe h3 {\n     font-size: 2em;\n   }\n   .ui.vertical.stripe .button + h3,\n   .ui.vertical.stripe p + h3 {\n     margin-top: 3em;\n   }\n   .ui.vertical.stripe .floated.image {\n     clear: both;\n   }\n   .ui.vertical.stripe p {\n     font-size: 1.33em;\n   }\n   .ui.vertical.stripe .horizontal.divider {\n     margin: 3em 0em;\n   }\n\n   .quote.stripe.segment {\n     padding: 0em;\n   }\n   .quote.stripe.segment .grid .column {\n     padding-top: 5em;\n     padding-bottom: 5em;\n   }\n\n   .footer.segment {\n     padding: 5em 0em;\n   }\n\n   .secondary.pointing.menu .toc.item {\n     display: none;\n   }\n\n   @media only screen and (max-width: 700px) {\n     .ui.fixed.menu {\n       display: none !important;\n     }\n     .secondary.pointing.menu .item,\n     .secondary.pointing.menu .menu {\n       display: none;\n     }\n     .secondary.pointing.menu .toc.item {\n       display: block;\n     }\n     .masthead.segment {\n       min-height: 350px;\n     }\n     .masthead h1.ui.header {\n       font-size: 2em;\n       margin-top: 1.5em;\n     }\n     .masthead h2 {\n       margin-top: 0.5em;\n       font-size: 1.5em;\n     }\n   }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<lfmc-mapbox></lfmc-mapbox>\n<div class=\"ui container\">\n  <div class=\"ui floating message\">\n    <i class=\"close icon\"></i>\n    <div class=\"header\">\n      <i class=\"info icon\"></i>\n      Under development\n    </div>\n    <div class=\"content\">This site is in a constant state of flux. Use at your own risk!</div>\n  </div>\n\n  <div class=\"ui vertical segment\">\n    <div class=\"ui divided equal width equal height stackable grid\">\n      <div class=\"column\">\n        <i class=\"compass icon\"></i>\n        <h3>\n        Stored Locations\n      </h3></div>\n      <div class=\"column\">\n        <i class=\"marker icon\"></i>\n        <h3>\n        Saved Points\n      </h3></div>\n      <div class=\"column\"><h3>\n        Under development\n      </h3></div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.onCloseMessage = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-home',
        template: __webpack_require__("../../../../../src/app/components/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/layer-map/layer-map.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/layer-map/layer-map.component.html":
/***/ (function(module, exports) {

module.exports = "<sui-accordion class=\"ui styled fluid accordion\">\n  <sui-accordion-panel [isOpen]=\"true\">\n    <div title>\n      <i class=\"dropdown icon\"></i> Datasets\n    </div>\n    <div content>\n      <table class=\"ui celled table\">\n        <thead>\n          <tr>\n            <th>Dataset</th>\n            <th>Name</th>\n            <th>Description</th>\n            <th>Frequency</th>\n            <th>Provider</th>\n            <th>Size</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>\n              <div class=\"ui toggle checkbox\">\n                <input type=\"checkbox\" name=\"Layer1\">\n                <label></label>\n              </div>\n            </td>\n            <td>KBDI</td>\n            <td>Keech-Byram Drought Index</td>\n            <td>6 hours</td>\n            <td>DELWP</td>\n            <td>100MB</td>\n          </tr>\n          <tr>\n            <td>\n              <div class=\"ui toggle checkbox\">\n                <input type=\"checkbox\" name=\"Layer3\">\n                <label></label>\n              </div>\n            </td>\n            <td>Cell</td>\n            <td>Cell</td>\n            <td>Cell</td>\n            <td>Cell</td>\n            <td>Cell</td>\n          </tr>\n          <tr>\n            <td>\n              <div class=\"ui toggle checkbox\">\n                <input type=\"checkbox\" name=\"Layer2\">\n                <label></label>\n              </div>\n            </td>\n            <td>Cell</td>\n            <td>Cell</td><td>Cell</td>\n            <td>Cell</td>\n            <td>Cell</td>\n          </tr>\n        </tbody>\n        <tfoot>\n          <tr>\n            <th colspan=\"6\">\n              <div class=\"ui right floated pagination menu\">\n                <a class=\"icon item\">\n          <i class=\"left chevron icon\"></i>\n        </a>\n                <a class=\"item\">1</a>\n                <a class=\"item\">2</a>\n                <a class=\"item\">3</a>\n                <a class=\"item\">4</a>\n                <a class=\"icon item\">\n          <i class=\"right chevron icon\"></i>\n        </a>\n              </div>\n            </th>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </sui-accordion-panel>\n  <sui-accordion-panel [isOpen]=\"false\">\n    <div title>\n      <i class=\"dropdown icon\"></i> Tilesets\n    </div>\n    <div content>\n      <p>Add classes to the <code>sui-accordion</code> element to apply styles.</p>\n    </div>\n  </sui-accordion-panel>\n</sui-accordion>\n"

/***/ }),

/***/ "../../../../../src/app/components/layer-map/layer-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayerMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LayerMapComponent = (function () {
    function LayerMapComponent() {
    }
    LayerMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.generateData();
            setInterval(function () { return _this.generateData(); }, 3000);
        }, 1000);
    };
    LayerMapComponent.prototype.generateData = function () {
        this.chartData = [];
        for (var i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
            this.chartData.push([
                "Index " + i + "1",
                Math.floor(Math.random() * 100)
            ]);
        }
    };
    return LayerMapComponent;
}());
LayerMapComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-layer-map',
        template: __webpack_require__("../../../../../src/app/components/layer-map/layer-map.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/layer-map/layer-map.component.css")]
    }),
    __metadata("design:paramtypes", [])
], LayerMapComponent);

//# sourceMappingURL=layer-map.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/options/options.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/options/options.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  options works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/options/options.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OptionsComponent = (function () {
    function OptionsComponent() {
    }
    OptionsComponent.prototype.ngOnInit = function () {
    };
    return OptionsComponent;
}());
OptionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-options',
        template: __webpack_require__("../../../../../src/app/components/options/options.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/options/options.component.css")]
    }),
    __metadata("design:paramtypes", [])
], OptionsComponent);

//# sourceMappingURL=options.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ui.card .avatar img.full,\n.ui.card .img.avatar.full,\n.ui.cards > .card img.avatar,\nimg.avatar.full {\n  width: 100%;\n  height: inherit;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui four column grid container\">\n  <div class=\"ui card\">\n  <div class=\"image\">\n    <img src=\"{{profile?.picture}}\" class=\"avatar full\" alt=\"avatar\">\n  </div>\n  <div class=\"content\">\n    <a><h3 class=\"nickname\">{{ profile?.nickname }}</h3></a>\n    <div class=\"meta\">\n      <span class=\"date\">Last updated: {{profile?.updated_at}}</span>\n      <span class=\"email\">{{profile?.name}}</span>\n    </div>\n    <div class=\"description\">\n    </div>\n  </div>\n  <div class=\"extra content\" *ngIf=\"false\">\n    <!--<pre class=\"full-profile\">{{ profile | json }}</pre>-->\n  </div>\n</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_persistence__ = __webpack_require__("../../../../angular-persistence/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(store, auth) {
        this.store = store;
        this.auth = auth;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
        }
        else {
            this.auth.getProfile(function (err, profile) {
                _this.profile = profile;
            });
            this.store.set('test', 'success', { type: __WEBPACK_IMPORTED_MODULE_2_angular_persistence__["c" /* StorageType */].SESSION });
        }
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-profile',
        template: __webpack_require__("../../../../../src/app/components/profile/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/profile/profile.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angular_persistence__["b" /* PersistenceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular_persistence__["b" /* PersistenceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], ProfileComponent);

var _a, _b;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/timeline/timeline.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/timeline/timeline.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  timeline works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/timeline/timeline.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimelineComponent = (function () {
    function TimelineComponent() {
    }
    TimelineComponent.prototype.ngOnInit = function () {
    };
    return TimelineComponent;
}());
TimelineComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-timeline',
        template: __webpack_require__("../../../../../src/app/components/timeline/timeline.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/timeline/timeline.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TimelineComponent);

//# sourceMappingURL=timeline.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/toolbar/toolbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/toolbar/toolbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui secondary menu\">\n  <a class=\"item\">\n    Tool\n  </a>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/toolbar/toolbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolbarComponent = (function () {
    function ToolbarComponent() {
    }
    ToolbarComponent.prototype.ngOnInit = function () {
    };
    return ToolbarComponent;
}());
ToolbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-toolbar',
        template: __webpack_require__("../../../../../src/app/components/toolbar/toolbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/toolbar/toolbar.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ToolbarComponent);

//# sourceMappingURL=toolbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/upload/upload.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ui.segment.dropzone,\n.dropzone {\n  border-style: dashed;\n  border-color: lightgray;\n  min-height:150px;\n  text-align: center;\n  padding-top: 3rem;\n  background-color: rgba(225,225,245,0.35);\n}\n.nv-file-over {\n  border-color: green;\n  background-color: rgba(225,245,225,0.35);\n}\n.another-file-over-class {\n  border: dashed 1px green;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/upload/upload.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui container\">\n    <!-- Steps -->\n  <div class=\"ui fluid steps\">\n    <div class=\"active step\">\n      <i class=\"file outline icon\"></i>\n      <div class=\"content\">\n        <div class=\"title\">Upload File(s)</div>\n        <div class=\"description\">Import GeoJSON, CSV or KML</div>\n      </div>\n    </div>\n    <div class=\"disabled step\">\n      <i class=\"bar chart icon\"></i>\n      <div class=\"content\">\n        <div class=\"title\">Readings extracted</div>\n        <div class=\"description\">Metadata analysis</div>\n      </div>\n    </div>\n    <div class=\"disabled step\">\n      <i class=\"microchip icon\"></i>\n      <div class=\"content\">\n        <div class=\"title\">Merging and Interpolation</div>\n      </div>\n    </div>\n    <div class=\"disabled step\">\n      <i class=\"server icon\"></i>\n      <div class=\"content\">\n        <div class=\"title\">Distribution</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Start: File Drop Area -->\n  <div ng2FileDrop\n  [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\"\n  (fileOver)=\"fileOverBase($event)\"\n  [uploader]=\"uploader\"\n  class=\"well\">\n    <div class=\"ui segment dropzone\">\n      <i class=\"big upload icon disabled\"></i>\n      <h3>Drag and Drop</h3>\n    </div>\n  </div>\n  <!-- End: File Drop Area -->\n  <div class=\"ui horizontal divider\"> Or</div>\n\n  <!-- Start: File Chooser -->\n  <div class=\"ui segment\">\n    <h3>Choose a file to upload: </h3>\n    <input ng2FileSelect\n    [ngClass]=\"{'another-file-over-class': hasAnotherDropZoneOver}\"\n    type=\"file\"\n    (fileOver)=\"fileOverAnother($event)\"\n    [uploader]=\"uploader\"\n    multiple />\n  </div>\n  <!-- End: File Chooser -->\n\n\n  <!-- Start: uploader queue -->\n  <div *ngIf=\"uploader.queue.length > 0\">\n    <!-- Uploader has Items -->\n    <div class=\"ui horizontal divider\"></div>\n    <div class=\"ui attached segment\">\n      <div class=\"mini ui icon buttons right floated\">\n        <button type=\"button\" class=\"mini ui icon positive button\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\"><i class=\"upload icon\"></i>Upload All</button>\n        <button type=\"button\" class=\"mini ui icon blue button\" (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\"><i class=\"ban icon\"></i>Cancel All</button>\n        <button type=\"button\" class=\"mini ui icon negative button\" (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\"><i class=\"delete icon\"></i>Flush Queue</button>\n      </div>\n      <h2 class=\"ui header\">File Upload Queue</h2>\n      <p>Contains {{uploader.queue.length}} item<span *ngIf=\"uploader.queue.length > 1\">s</span>.</p>\n    </div>\n\n    <!-- ITEMS -->\n    <div class=\"ui attached segment\">\n      <div class=\"ui internally celled grid\">\n        <!-- start: item -->\n        <div *ngFor=\"let item of uploader.queue\" class=\"equal height row\">\n          <div class=\"four wide column\">\n            <h5 class=\"header\">{{ item.file.name }}</h5>\n            <div class=\"meta\">\n              <p>{{item.file.size/1024/1024 | number:'.2'}} MB</p>\n              <p>{{item.file.type}}</p>\n            </div>\n          </div>\n          <div class=\"seven wide column middle aligned\">\n              <sui-progress [value]=\"item.progress\" [showProgress]=\"true\" [maximum]=\"maximum\" [precision]=\"precision\">\n                <div class=\"progress\">{{item.progress + '%'}}</div>\n              </sui-progress>\n            </div>\n          <div class=\"five wide column middle aligned\">\n            <div class=\"mini ui icon buttons fluid\">\n              <button type=\"button\" class=\"mini ui icon button\" (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess || item.isError\"><i class=\"green upload icon\"></i>Upload file</button>\n              <button type=\"button\" class=\"mini ui icon button\" (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\"><i class=\"blue stop icon\"></i>Stop upload</button>\n              <button type=\"button\" class=\"mini ui icon button\" (click)=\"item.remove()\" [disabled]=\"!item.isSuccess\"><i class=\"red delete icon\"></i>Remove file</button>\n            </div>\n          </div>\n        </div>\n        <!-- end: item -->\n      </div>\n    </div>\n    <!-- End: ITEMS -->\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/upload/upload.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_mapbox_upload_api_s3_service__ = __webpack_require__("../../../../../src/app/services/mapbox-upload-api-s3.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// TODO
var URL = 'http:////localhost:1880/upload';
var UploadComponent = (function () {
    function UploadComponent(s3Service) {
        this.s3Service = s3Service;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
    }
    UploadComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploadComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    UploadComponent.prototype.ngOnInit = function () {
    };
    return UploadComponent;
}());
UploadComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-upload',
        template: __webpack_require__("../../../../../src/app/components/upload/upload.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/upload/upload.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_mapbox_upload_api_s3_service__["a" /* MapboxUploadAPIS3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_mapbox_upload_api_s3_service__["a" /* MapboxUploadAPIS3Service */]) === "function" && _a || Object])
], UploadComponent);

var _a;
//# sourceMappingURL=upload.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth0_variables__ = __webpack_require__("../../../../../src/app/services/auth0-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_js__ = __webpack_require__("../../../../auth0-js/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_auth0_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = (function () {
    function AuthService(router) {
        this.router = router;
        this.auth0 = new __WEBPACK_IMPORTED_MODULE_4_auth0_js__["WebAuth"]({
            clientID: __WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].clientID,
            domain: __WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].domain,
            responseType: 'token id_token',
            audience: "https://" + __WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].domain + "/userinfo",
            redirectUri: __WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].callbackURL,
            scope: 'openid profile'
        });
    }
    AuthService.prototype.login = function () {
        this.auth0.authorize();
    };
    AuthService.prototype.handleAuthentication = function () {
        var _this = this;
        this.auth0.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                _this.setSession(authResult);
                _this.router.navigate(['/home']);
            }
            else if (err) {
                _this.router.navigate(['/home']);
                console.log(err);
                alert("Error: " + err.error + ". Check the console for further details.");
            }
        });
    };
    AuthService.prototype.getProfile = function (cb) {
        var accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }
        var self = this;
        this.auth0.client.userInfo(accessToken, function (err, profile) {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    };
    AuthService.prototype.setSession = function (authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    };
    AuthService.prototype.logout = function () {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    };
    AuthService.prototype.isAuthenticated = function () {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/auth0-variables.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTH_CONFIG; });
var AUTH_CONFIG = {
    domain: 'bnhcrclfmc.au.auth0.com',
    clientID: '5pP2Zg470UaUpF44jIdX6Peo2OWuWElX',
    callbackURL: 'http://localhost:4200/callback'
};
//# sourceMappingURL=auth0-variables.js.map

/***/ }),

/***/ "../../../../../src/app/services/map.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mapbox_gl_dist_mapbox_gl_js__ = __webpack_require__("../../../../mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mapbox_gl_dist_mapbox_gl_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mapbox_gl_dist_mapbox_gl_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapService = (function () {
    function MapService() {
        this.accessToken = 'pk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o1dm81NTIwMDN6MTJxbjlvOHBiNHdlOSJ9.lt8I4sU0ceA6N8Tnnmx2ig';
        __WEBPACK_IMPORTED_MODULE_1_mapbox_gl_dist_mapbox_gl_js__["accessToken"] = this.accessToken;
    }
    return MapService;
}());
MapService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], MapService);

//# sourceMappingURL=map.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/mapbox-upload-api-s3.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapboxUploadAPIS3Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import * as AWS from 'aws-sdk';
var MapboxUploadAPIS3Service = (function () {
    function MapboxUploadAPIS3Service() {
        // Example credentials object returned from Mapbox
        this.credentials = {
            "bucket": "tilestream-tilesets-production",
            "key": "71/_pending/loalnu31ml23x960d4a7h76jc/anthonyrawlinsuom",
            "accessKeyId": "ASIAJJYWIPEIZ2WZC7DQ",
            "secretAccessKey": "QFE8ind4LYJA26EcDTYSN8WP2B4ynjp1sX/KDPTL",
            "sessionToken": "FQoDYXdzELf//////////wEaDJyIC16VM4lz2ceZ8CLTAkNz7cq/N15UIQDcflw4v6icU680Og3GV3O7FL7KrFSeAc1am3n/DORbt7z6WFfiA1COFQ+ZBRo1IWIfm98mH86vuCHLivDe4TFvTzq5VeXhMeJ11AN623X+jLsnKRwU7H6+EO9DB7XUccNHN5NPMjRSmXKEo4siHdU4SOv6kEfnHV8qRYCh2zHmfniCAL3u4C3ML7VC+Od+iCbKxgioscXsWL7g9P70DwVZQs1tePlrOx1RSQKuEewBakUfMn5ob1dvJ8bvtSZ8FkaddOs1mvpmCL4ieOgTre8tzgYQnW41zc8gG2J8z08QVNDFKk2UR0U++aefWvDTgnhvfcbY48Zj9jEOx6V46Vg9na7NfUQ2zgCiPdlKxbdd1tuCYVjawSpCo9Rk3NHpCKGhSghFLT9kGr0kqI+en04pRbOgRQyK2hiBwc06a4jR9r3KUJI2Gdx+NSjglbXMBQ==",
            "url": "https://tilestream-tilesets-production.s3.amazonaws.com/71/_pending/loalnu31ml23x960d4a7h76jc/anthonyrawlinsuom"
        };
        this.accessToken = 'sk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o2N2g1empqMDVidjMycnA0NDg2NHFxcSJ9.J3AhcZ0L0HnWcwWdH-phiA';
        this.credentialsURL = 'https://api.mapbox.com/uploads/v1/anthonyrawlinsuom/credentials?access_token=' + this.accessToken;
    }
    return MapboxUploadAPIS3Service;
}());
MapboxUploadAPIS3Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], MapboxUploadAPIS3Service);

//# sourceMappingURL=mapbox-upload-api-s3.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/modis.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModisService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ModisService = (function () {
    function ModisService() {
    }
    return ModisService;
}());
ModisService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ModisService);

//# sourceMappingURL=modis.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/barchart/barchart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".d3-chart {\n  width: 100%;\n  height:400px;\n}\n\n.d3-chart .axis path,\n.d3-chart .axis line {\n  stroke: #999;\n}\n\n.d3-chart .axis text {\n  fill: #999;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/barchart/barchart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"d3-chart\" #chart></div>\n"

/***/ }),

/***/ "../../../../../src/app/shared/barchart/barchart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarchartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BarchartComponent = (function () {
    function BarchartComponent() {
        this.margin = { top: 20, bottom: 20, left: 20, right: 20 };
    }
    BarchartComponent.prototype.ngOnInit = function () {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    };
    BarchartComponent.prototype.ngOnChanges = function () {
        if (this.chart) {
            this.updateChart();
        }
    };
    BarchartComponent.prototype.createChart = function () {
        var element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        var svg = __WEBPACK_IMPORTED_MODULE_1_d3__["select"](element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);
        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")");
        // define X & Y domains
        var xDomain = this.data.map(function (d) { return d[0]; });
        var yDomain = [0, __WEBPACK_IMPORTED_MODULE_1_d3__["max"](this.data, function (d) { return d[1]; })];
        // create scales
        this.xScale = __WEBPACK_IMPORTED_MODULE_1_d3__["scaleBand"]().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = __WEBPACK_IMPORTED_MODULE_1_d3__["scaleLinear"]().domain(yDomain).range([this.height, 0]);
        // bar colors
        this.colors = __WEBPACK_IMPORTED_MODULE_1_d3__["scaleLinear"]().domain([0, this.data.length]).range(['red', 'blue']);
        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', "translate(" + this.margin.left + ", " + (this.margin.top + this.height) + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["axisBottom"](this.xScale));
        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["axisLeft"](this.yScale));
    };
    BarchartComponent.prototype.updateChart = function () {
        var _this = this;
        // update scales & axis
        this.xScale.domain(this.data.map(function (d) { return d[0]; }));
        this.yScale.domain([0, __WEBPACK_IMPORTED_MODULE_1_d3__["max"](this.data, function (d) { return d[1]; })]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(__WEBPACK_IMPORTED_MODULE_1_d3__["axisBottom"](this.xScale));
        this.yAxis.transition().call(__WEBPACK_IMPORTED_MODULE_1_d3__["axisLeft"](this.yScale));
        var update = this.chart.selectAll('.bar')
            .data(this.data);
        // remove exiting bars
        update.exit().remove();
        // update existing bars
        this.chart.selectAll('.bar').transition()
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('width', function (d) { return _this.xScale.bandwidth(); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); })
            .style('fill', function (d, i) { return _this.colors(i); });
        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(0); })
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', function (d, i) { return _this.colors(i); })
            .transition()
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); });
    };
    return BarchartComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chart'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], BarchartComponent.prototype, "chartContainer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarchartComponent.prototype, "data", void 0);
BarchartComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-barchart',
        template: __webpack_require__("../../../../../src/app/shared/barchart/barchart.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/barchart/barchart.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [])
], BarchartComponent);

var _a;
//# sourceMappingURL=barchart.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/d3map/d3map.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/d3map/d3map.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  d3map works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/shared/d3map/d3map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3mapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var D3mapComponent = (function () {
    function D3mapComponent() {
    }
    D3mapComponent.prototype.ngOnInit = function () {
    };
    return D3mapComponent;
}());
D3mapComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-d3map',
        template: __webpack_require__("../../../../../src/app/shared/d3map/d3map.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/d3map/d3map.component.css")]
    }),
    __metadata("design:paramtypes", [])
], D3mapComponent);

//# sourceMappingURL=d3map.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/mapbox/mapbox.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#mymapbox,\n#myaltmap {\n  height: 600px;\n  padding: 0em;\n  margin: 0em;\n}\n\n#myoverlay {\n  position: absolute;\n  width: ((100%)-1em);\n  top: 1em;\n  left: 4em;\n}\n\n#geocoder-container > div {\n    min-width:50%;\n    margin-left:25%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/mapbox/mapbox.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"position:relative;\">\n  <div id=\"mymapbox\" class=\"ui mapbox mapboxgl-map\"></div>\n\n  <div id=\"myoverlay\">\n    <div class=\"ui container\">\n      <div class=\"ui mini labeled input\">\n        <div class=\"ui mini label\">Latitude: </div><input [(ngModel)]=\"lat\"></div>\n      <div class=\"ui mini labeled input\">\n        <div class=\"ui mini label\">Longitude: </div><input [(ngModel)]=\"lng\"></div>\n      <div class=\"ui mini labeled input\">\n        <div class=\"ui mini label\">Bearing: </div><input [(ngModel)]=\"bearing\"></div>\n      <div class=\"ui mini labeled input\">\n        <div class=\"ui mini label\">Zoom: </div><input [(ngModel)]=\"zoom\"></div>\n    </div>\n  </div>\n</div>\n\n<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.1.0/mapbox-gl-geocoder.min.js'></script>\n<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.1.0/mapbox-gl-geocoder.css' type='text/css' />\n<div class=\"ui container\">\n  <div class=\"ui mini buttons\">\n\n    <button class=\"ui mini button\" (click)=\"setDefaultStyle()\">Default</button>\n    <div class=\"or\"></div>\n    <button class=\"ui mini button\" (click)=\"setDatavizStyle()\">DataViz</button>\n    <div class=\"or\"></div>\n    <button class=\"ui mini button\" (click)=\"setSatelliteStyle()\">Satellite</button>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/shared/mapbox/mapbox.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapboxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_map_service__ = __webpack_require__("../../../../../src/app/services/map.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js__ = __webpack_require__("../../../../mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapboxGeocoder = __webpack_require__("../../../../@mapbox/mapbox-gl-geocoder/lib/index.js");
var MapboxComponent = (function () {
    function MapboxComponent(mapService) {
        this.mapService = mapService;
        this.lat = -36.568;
        this.lng = 145.062;
        this.zoom = 6;
        this.bearing = 0;
        // Set bounds to Victorian Area
        this.bounds = [
            [140.09765625,
                -39.90973623453718],
            [150.9521484375,
                -33.504759069226075]
        ];
    }
    MapboxComponent.prototype.ngOnInit = function () {
        var map = new __WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js__["Map"]({
            container: 'mymapbox',
            style: 'mapbox://styles/anthonyrawlinsuom/cj5we9hex7cy82rqimwlky6rz',
            center: [this.lng, this.lat],
            zoom: this.zoom,
            hash: true,
            boxZoom: true,
            attributionControl: false,
            maxBounds: this.bounds
        });
        this.geo = new __WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js__["GeolocateControl"]();
        this.nav = new __WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js__["NavigationControl"]();
        this.scl = new __WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js__["ScaleControl"]();
        this.ful = new __WEBPACK_IMPORTED_MODULE_2_mapbox_gl_dist_mapbox_gl_js__["FullscreenControl"]();
        var geocoder = new MapboxGeocoder({
            accessToken: this.mapService.accessToken
        });
        map.addControl(geocoder);
        map.addControl(this.nav, 'top-left');
        map.addControl(this.geo, 'top-left');
        map.addControl(this.scl, 'bottom-left');
        map.addControl(this.ful, 'bottom-right');
        map.on('load', function () {
            map.addSource('single-point', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": []
                }
            });
            map.addLayer({
                "id": "point",
                "source": "single-point",
                "type": "circle",
                "paint": {
                    "circle-radius": 5,
                    "circle-color": "#A6423C"
                }
            });
            map.on('move', function (ev) {
                // alt.options.center = map.options.center;
                // alt.options.zoom = map.options.zoom;
            });
            // Listen for the `geocoder.input` event that is triggered when a user
            // makes a selection and add a symbol that matches the result.
            geocoder.on('result', function (ev) {
                map.getSource('single-point').setData(ev.result.geometry);
                this.lat = ev.result.geometry.lat;
                this.lng = ev.result.geometry.lng;
            });
        });
        this.mapService.map = map;
    };
    MapboxComponent.prototype.setSatelliteStyle = function () {
        this.mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');
    };
    MapboxComponent.prototype.setDatavizStyle = function () {
        this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj6eembnj0x4k2smhax6o0ztl');
    };
    MapboxComponent.prototype.setDefaultStyle = function () {
        this.mapService.map.setStyle('mapbox://styles/anthonyrawlinsuom/cj5we9hex7cy82rqimwlky6rz');
    };
    return MapboxComponent;
}());
MapboxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'lfmc-mapbox',
        template: __webpack_require__("../../../../../src/app/shared/mapbox/mapbox.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/mapbox/mapbox.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_map_service__["a" /* MapService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_map_service__["a" /* MapService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_map_service__["a" /* MapService */]) === "function" && _a || Object])
], MapboxComponent);

var _a;
//# sourceMappingURL=mapbox.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map