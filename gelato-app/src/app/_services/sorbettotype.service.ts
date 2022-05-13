import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SorbettoType } from '../_models/sorbettotype';

@Injectable({
  providedIn: 'root'
})
export class SorbettotypeService {

  baseURL = environment.apiURL;

  sorbettoTypes: SorbettoType[] = [];
  constructor(private http: HttpClient, private router: Router ) {}

  readSorbettoTypes(){
    //check if local storage has the data and return it as an osbservable using the 'of' operator
    if (this.sorbettoTypes.length >0)
      return of(this.sorbettoTypes);
    //get from db via api endpoint
    return this.http.get<SorbettoType[]>(this.baseURL + `sorbettotypes`).pipe(
      map(sorbettos => {
        this.sorbettoTypes = sorbettos;
        return sorbettos;
      })
    );
  }

  readSorbettoType(id: number){
    //try locally
    const sorbetto = this.sorbettoTypes.find(s => s.id === id);
    if (sorbetto !== undefined) return of(sorbetto);
    //get from db
    return this.http.get<SorbettoType>(this.baseURL + `sorbettotypes/${id}`);
  }

  createSorbettoType(sorbettoType: SorbettoType){
    return this.http.post<SorbettoType>(this.baseURL + `sorbettotypes`, sorbettoType).pipe(
      map(sorbetto => {
        this.sorbettoTypes.push(sorbetto);
        return sorbetto;
      })
    );
  }

  updateSorbettoType(id: number, sorbettoType: SorbettoType){
    return this.http.put(this.baseURL + `sorbettotypes/${id}`, sorbettoType).pipe(
      map( () =>{
        const index = this.sorbettoTypes.indexOf(sorbettoType);
        if (index) this.sorbettoTypes[index] = sorbettoType;
      })
    );
  }

  deleteSorbettoType(id: number){
    return this.http.delete(this.baseURL + `sorbettoTypes/${id}`).pipe(
      map( () => {
        const sorbetto = this.sorbettoTypes.find(s => s.id === id);
        if (sorbetto) {
          const index = this.sorbettoTypes.indexOf(sorbetto);
          this.sorbettoTypes.splice(index, 1);
        }
      })
    );
  }

  //frontend navigation: after creating or updating navigates back to list
  navigateToSorbettoTypeList(){
    this.router.navigateByUrl('/sorbettotypes');
  }

}
