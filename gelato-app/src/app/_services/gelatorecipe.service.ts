import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseType } from '../_models/basetype';
import { GelatoRecipe } from '../_models/gelatorecipe';
import { RawMaterial } from '../_models/rawmaterial';
import { BaseRecipeService } from './base-recipe.service';
import { RawMaterialService } from './rawmaterial.service';

@Injectable({
  providedIn: 'root'
})

export class GelatoRecipeService {
  
  baseURL = environment.apiURL;

  //app state: service storage
  gelatoRecipes: GelatoRecipe[] = [];
  rawMaterials: RawMaterial[] = [];
  variegatos: RawMaterial[] = [];
  pastas: RawMaterial[] = [];
  baseTypes: BaseType[] = [];
  
  constructor(private http: HttpClient, private router: Router, 
    private rawMaterialService: RawMaterialService,
    private baseRecipeService: BaseRecipeService) {
      this.readBaseTypes();
      this.readRawMaterials();
     }

  readGelatoRecipes() {
    //check if local storage has the data and return it as an osbservable using the 'of' operator
    if (this.gelatoRecipes.length >0) return of(this.gelatoRecipes);
    return this.http.get<GelatoRecipe[]>(this.baseURL + 'gelatorecipes').pipe(
        map(recipes => {
          this.gelatoRecipes = recipes;
          return recipes;
        })
    );
  }

  readGelatoRecipe(id: number) {
    const recipe = this.gelatoRecipes.find(r => r.id === id);
    if (recipe !== undefined) return of(recipe);
    return this.http.get<GelatoRecipe>(this.baseURL + `gelatorecipes/${id}`);
  }

  createGelatoRecipe(gelatoRecipe: GelatoRecipe) {
    return this.http.post<GelatoRecipe>(this.baseURL + `gelatorecipes`, gelatoRecipe).pipe(
      map(recipe => {
        recipe.baseType = this.baseTypes.find(b => b.id === recipe.baseTypeId)!;
        if (recipe.pastaAId) recipe.pastaA = this.rawMaterials.find(m => m.id === recipe.pastaAId)!;
        if (recipe.pastaBId) recipe.pastaB = this.rawMaterials.find(m => m.id === recipe.pastaBId)!;
        if (recipe.variegatoAId) recipe.variegatoA = this.rawMaterials.find(m => m.id === recipe.variegatoAId)!;
        if (recipe.variegatoBId) recipe.variegatoB = this.rawMaterials.find(m => m.id === recipe.variegatoBId)!;
        this.gelatoRecipes.push(recipe);
        return recipe;
      })
    );
  }

  updateGelatoRecipe(gelatoRecipe: GelatoRecipe) {
    return this.http.put(this.baseURL + `gelatorecipes/${gelatoRecipe.id}`, gelatoRecipe).pipe(
      map( ()=> {
        const index = this.gelatoRecipes.indexOf(gelatoRecipe);
        this.gelatoRecipes[index] = gelatoRecipe;
      })
    );
  }

  deleteGelatoRecipe(id: number) {
    return this.http.delete(this.baseURL + `gelatorecipes/${id}`).pipe(
      map( () => {
        const recipe = this.gelatoRecipes.find(r => r.id === id);
        if (recipe) {
          const index = this.gelatoRecipes.indexOf(recipe);
          this.gelatoRecipes.splice(index, 1);
        }
      })
    );
  }

  // Poderia criar getVariegatos e getPastas
  readRawMaterials(){
    this.rawMaterialService.getRawMaterials().subscribe(materials => {
      this.rawMaterials = materials;
    });
  }

  //filtar por RawMaterialType: 1 (pasta) ou 3 (pasta/variegato)
  readVariegatos(){

  }

  //filtar por RawMaterialType: 2 (variegato) ou 3 (pasta/variegato) ou 5 (basica/variegato)
  readPastas(){

  }

  readBaseTypes(){
    this.baseRecipeService.getBaseTypes().subscribe(types => {
      this.baseTypes = types;
    });
  }

  //frontend navigation: after creating or updating a recipe navigates back to gelatos list
  navigateToGelatoList(){
    this.router.navigateByUrl('/gelatos');
  }

}
