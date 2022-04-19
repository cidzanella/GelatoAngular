import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RawmaterialFormComponent } from '../rawmaterials/rawmaterial-form/rawmaterial-form.component';
import { RawmaterialUpdateComponent } from '../rawmaterials/rawmaterial-update/rawmaterial-update.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate( component: RawmaterialUpdateComponent): boolean {
    console.log(component);
    if (component.formDirty){
      return confirm('As alterações não registradas serão perdidas. Deseja continuar?');
    }
    return true;
  }
  
}
