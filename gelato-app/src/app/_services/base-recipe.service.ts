import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseRecipeItem } from '../_models/baserecipe';
import { BaseType } from '../_models/basetype';

@Injectable({
  providedIn: 'root'
})
export class BaseRecipeService {

  baseURL = environment.apiURL;
  baseTypes: BaseType[] = [];
  baseRecipes: BaseRecipeItem[] = [];

  constructor(private http: HttpClient) { }

  getBaseTypes(){
    if (this.baseTypes.length > 0) return of(this.baseTypes);

    return this.http.get<BaseType[]>(this.baseURL + 'baserecipes/basetypes').pipe(
      map(baseTypes => {
        this.baseTypes = baseTypes;
        return baseTypes;
      })
    )
  }

  getBaseRecipeByBaseType(id: number){
    let localBaseRecipes = this.baseRecipes.filter(item => item.baseTypeId === id);
    if (localBaseRecipes.length > 0) return of(localBaseRecipes);

    return this.http.get<BaseRecipeItem[]>(this.baseURL + `baserecipes/bybasetype/${id}`).pipe(
      map(items => {
        this.baseRecipes = this.baseRecipes.concat(items);
        return items;
      })
    )
  }

  getBaseRecipeItem(id: number){
    const recipeItem = this.baseRecipes.find(item => item.id === id);
    if (recipeItem !== undefined) return of(recipeItem);
    return this.http.get<BaseRecipeItem>(this.baseURL + `baserecipes/${id}`)
  }

  addBaseRecipeItem(item: BaseRecipeItem){
    return this.http.post<BaseRecipeItem>(this.baseURL + 'baserecipes', item).pipe(
      map(responseItem => {
        console.log('retorno');
        console.log(responseItem);
        this.baseRecipes.push(responseItem);
        return responseItem;
      })
    )
  }

  updateBaseRecipeItem(item: BaseRecipeItem){
    return this.http.put(this.baseURL + `baserecipes/${item.id}`, item).pipe(
      map( ()=> {
        const index = this.baseRecipes.indexOf(item);
        this.baseRecipes[index] = item;
      })
    )
  }

  deleteBaseRecipeItem(item: BaseRecipeItem){
    return this.http.delete(this.baseURL + `baserecipes/${item.id}`).pipe(
      map( () => {
        const index = this.baseRecipes.indexOf(item);
        this.baseRecipes.splice(index,1);
      })
    )
  }

}
