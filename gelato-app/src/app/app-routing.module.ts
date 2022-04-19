import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaserecipesComponent } from './baserecipes/baserecipes.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { DisplayFlowComponent } from './gelato-display/display-flow/display-flow.component';
import { GelatoDetailComponent } from './gelatos/gelato-detail/gelato-detail.component';
import { GelatoListComponent } from './gelatos/gelato-list/gelato-list.component';
import { HomeComponent } from './home/home.component';
import { GelatoFreezerComponent } from './inventory/gelato-freezer/gelato-freezer.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductionComponent } from './production/production.component';
import { RawmaterialCreateComponent } from './rawmaterials/rawmaterial-create/rawmaterial-create.component';
import { RawmaterialListComponent } from './rawmaterials/rawmaterial-list/rawmaterial-list.component';
import { RawmaterialUpdateComponent } from './rawmaterials/rawmaterial-update/rawmaterial-update.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'production', component: ProductionComponent},
      {path: 'gelato-display', component: DisplayFlowComponent},
      {path: 'gelatos', component: GelatoListComponent},
      {path: 'gelatos/:id', component: GelatoDetailComponent},
      {path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard]},
      {path: 'inventory/gelato-freezer', component: GelatoFreezerComponent},
      {path: 'rawmaterials', component: RawmaterialListComponent },
      {path: 'rawmaterials/create', component: RawmaterialCreateComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'rawmaterials/update/:id', component: RawmaterialUpdateComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'baserecipes', component: BaserecipesComponent}
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
