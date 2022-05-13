import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { BaserecipesComponent } from './baserecipes/baserecipes.component';
import { GelatoCreateComponent } from './gelatos/gelato-create/gelato-create.component';
import { GelatoUpdateComponent } from './gelatos/gelato-update/gelato-update.component';
import { SorbettotypeCreateComponent } from './sorbettos/sorbettotype-create/sorbettotype-create.component';
import { SorbettotypeUpdateComponent } from './sorbettos/sorbettotype-update/sorbettotype-update.component';
import { SorbettotypeFormComponent } from './sorbettos/sorbettotype-form/sorbettotype-form.component';
import { SorbettotypeListComponent } from './sorbettos/sorbettotype-list/sorbettotype-list.component';
import { SorbettorecipeComponent } from './sorbettos/sorbettorecipe/sorbettorecipe.component';

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
    ServerErrorComponent,
    BaserecipesComponent,
    GelatoCreateComponent,
    GelatoUpdateComponent,
    SorbettotypeCreateComponent,
    SorbettotypeUpdateComponent,
    SorbettotypeFormComponent,
    SorbettotypeListComponent,
    SorbettorecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
