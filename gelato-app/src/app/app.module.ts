import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { GelatoListComponent } from './gelatos/gelato-list/gelato-list.component';
import { GelatoDetailComponent } from './gelatos/gelato-detail/gelato-detail.component';
import { GelatoFormComponent } from './gelatos/gelato-form/gelato-form.component';
import { GelatoFreezerComponent } from './inventory/gelato-freezer/gelato-freezer.component';
import { DisplayFlowComponent } from './gelato-display/display-flow/display-flow.component';
import { LiveDisplayComponent } from './gelato-display/live-display/live-display.component';
import { SuggestedProductionComponent } from './production/suggested-production/suggested-production.component';
import { GelatoProductionComponent } from './production/gelato-production/gelato-production.component';
import { SorbettoProductionComponent } from './production/sorbetto-production/sorbetto-production.component';
import { CaramelloProductionComponent } from './production/caramello-production/caramello-production.component';
import { ExtractionComponent } from './production/extraction/extraction.component';
import { ProductionPerformanceComponent } from './production/production-performance/production-performance.component';
import { ProductionOutputComponent } from './production/production-output/production-output.component';
import { ProductionComponent } from './production/production.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DisplayComponent } from './gelato-display/display/display.component';
import { SharedModule } from './_modules/shared.module';
import { RawmaterialFormComponent } from './rawmaterials/rawmaterial-form/rawmaterial-form.component';
import { RawmaterialListComponent } from './rawmaterials/rawmaterial-list/rawmaterial-list.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { RawmaterialCreateComponent } from './rawmaterials/rawmaterial-create/rawmaterial-create.component';
import { RawmaterialUpdateComponent } from './rawmaterials/rawmaterial-update/rawmaterial-update.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    GelatoListComponent,
    GelatoDetailComponent,
    GelatoFormComponent,
    GelatoFreezerComponent,
    DisplayFlowComponent,
    LiveDisplayComponent,
    SuggestedProductionComponent,
    GelatoProductionComponent,
    SorbettoProductionComponent,
    CaramelloProductionComponent,
    ExtractionComponent,
    ProductionPerformanceComponent,
    ProductionOutputComponent,
    ProductionComponent,
    InventoryComponent,
    DisplayComponent,
    RawmaterialFormComponent,
    RawmaterialListComponent,
    RawmaterialCreateComponent,
    RawmaterialUpdateComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
