import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RawMaterial } from '../_models/rawmaterial';
import { RawMaterialSupplier } from '../_models/rawmaterialsupplier';
import { RawMaterialType } from '../_models/rawmaterialtype';


@Injectable({
  providedIn: 'root'
})

export class RawMaterialService {

  baseURL = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) { }
  // criar chamada aos end-points: 
  // get raw / get all raws  / create raw  / update raw  / delete raw  / get suppliers / get types
  // precisa ter um observable de que? da lista de raw material? 
  // e como vai fazer o form de cadastro ser reativo?
  
  getRawMaterials() {
    return this.http.get<RawMaterial[]>(this.baseURL + 'rawmaterials')
  }

  getRawMaterial(id: number) {
    return this.http.get<RawMaterial>(this.baseURL + `rawmaterials/${id}`)
  }

  getRawMaterialSuppliers() {
    return this.http.get<RawMaterialSupplier[]>(this.baseURL + 'rawmaterials/getrawmaterialsuppliers');
  }

  getRawMaterialTypes() {
    return this.http.get<RawMaterialType[]>(this.baseURL + 'rawmaterials/getrawmaterialtypes');
  }

  updateRawMaterial(rawMaterial: RawMaterial) {
    return this.http.put(this.baseURL + `rawMaterials/${rawMaterial.id}`, rawMaterial);
  }

  createRawMaterial(rawMaterial: RawMaterial) {
    return this.http.post<RawMaterial>(this.baseURL + 'rawMaterials', rawMaterial)
  }

  //frontend navigation
  navigateToRawMaterialList(){
    this.router.navigateByUrl('/rawmaterials');
  }

}
