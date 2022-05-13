import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SorbettoRecipeItem } from '../_models/sorbettorecipeitem';

@Injectable({
  providedIn: 'root'
})
export class SorbettoRecipeService {

  baseURL = environment.apiURL;

  sorbettoRecipes: SorbettoRecipeItem[] =[];

  constructor(private http: HttpClient, private route: Router) { }

  readSorbettoRecipes(){
    //check local
    if (this.sorbettoRecipes.length >0) return of(this.sorbettoRecipes);
    //get from db via api
    return this.http.get<SorbettoRecipeItem[]>(this.baseURL + 'sorbettorecipes').pipe(
      map(sorbettosRecipes => {
        this.sorbettoRecipes = sorbettosRecipes;
        return sorbettosRecipes;
      })
    );
  }

  // get recipe itens for a given sorbetto type - ex: fragola
  readSorbettoRecipe(id: number) {
    //try locally
    const recipe = this.sorbettoRecipes.filter(i => i.sorbettoTypeId === id);
    if (recipe.length >0) return of(recipe);
    //fetch db via webapi
    return this.http.get<SorbettoRecipeItem[]>(this.baseURL + `sorbettorecipes/${id}`).pipe(
      map(recipeItems => {
        this.sorbettoRecipes = this.sorbettoRecipes.concat(recipeItems);
        return recipeItems;
      })
    )
  }

  // get one item from recipe given item id
  readSorbettoRecipeItem(id: number) {
    //try locally
    const recipeItem = this.sorbettoRecipes.find(i => i.id === id);
    if (recipeItem !== undefined) return of(recipeItem);
    //fetch db
    return this.http.get<SorbettoRecipeItem>(this.baseURL + `sorbettorecipes/item/${id}`);
  }

  createSorbettoRecipeItem(sorbettoRecipeItem: SorbettoRecipeItem){
    return this.http.post<SorbettoRecipeItem>(this.baseURL + `sorbettorecipes/item`, sorbettoRecipeItem). pipe(
      map(recipe => {
        this.sorbettoRecipes.push(recipe);
        return recipe;
      })
    );
  }

  updateSorbettoRecipeItem(sorbettoRecipeItem: SorbettoRecipeItem) {
    return this.http.put<SorbettoRecipeItem>(this.baseURL + `sorbettorecipes/item/${sorbettoRecipeItem.id}`, sorbettoRecipeItem).pipe(
      map( () => {
        //update local array
        const index = this.sorbettoRecipes.indexOf(sorbettoRecipeItem);
        if (index) this.sorbettoRecipes[index] = sorbettoRecipeItem;
      })
    )
  }

  deleteSorbettoRecipe(id: number) {
    return this.http.delete(this.baseURL + `sorbettorecipes/${id}`).pipe(
      map( () => {
        //update local array of recipes to reflect database
        const recipeItens = this.sorbettoRecipes.filter(i => i.sorbettoTypeId === id);
        //remove all itens on the recipe of the given sorbetto type 
        recipeItens.forEach(item  => {
          const index = this.sorbettoRecipes.indexOf(item);
          this.sorbettoRecipes.splice(index, 1);          
        });
      })
    )
  }

  deleteSorbettoRecipeItem(id: number) {
    return this.http.delete(this.baseURL + `sorbettorecipes/item/${id}`).pipe(
      map( () => {
        //update local array of recipes
        const recipeItem = this.sorbettoRecipes.find(i => i.id === id);
        if (recipeItem) {
          const index = this.sorbettoRecipes.indexOf(recipeItem);
          this.sorbettoRecipes.splice(index, 1);
        }
      })
    )
  }

  
}
