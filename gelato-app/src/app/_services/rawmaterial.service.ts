import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RawMaterial } from '../_models/rawmaterial';
import { RawMaterialSupplier } from '../_models/rawmaterialsupplier';
import { RawMaterialType } from '../_models/rawmaterialtype';


@Injectable({
  providedIn: 'root'
})

export class RawMaterialService {

  baseURL = environment.apiURL;
  
  //app state: service storage
  rawMaterials: RawMaterial[] = [];
  materialSuppliers: RawMaterialSupplier[] = [];
  materialTypes: RawMaterialType[] = [];

  constructor(private http: HttpClient, private router: Router) { }
  // criar chamada aos end-points: 
  // get raw / get all raws  / create raw  / update raw  / delete raw  / get suppliers / get types
  // precisa ter um observable de que? da lista de raw material? 
  // e como vai fazer o form de cadastro ser reativo?
  
  getRawMaterials() {
    //check if local storage has the data and return it as an osbservable using the 'of' operator
    if (this.rawMaterials.length >0) return of(this.rawMaterials);
    return this.http.get<RawMaterial[]>(this.baseURL + 'rawmaterials').pipe(
      map(materials => {
        this.rawMaterials = materials;
        return materials;
      })
    );
  }

  getRawMaterial(id: number) {
    const material = this.rawMaterials.find(m => m.id === id);
    if (material !== undefined) return of(material);
    return this.http.get<RawMaterial>(this.baseURL + `rawmaterials/${id}`);
  }

  getRawMaterialSuppliers() {
    if (this.materialSuppliers.length > 0) return of(this.materialSuppliers);
    return this.http.get<RawMaterialSupplier[]>(this.baseURL + 'rawmaterials/getrawmaterialsuppliers').pipe(
      map(suppliers => {
        this.materialSuppliers = suppliers;
        return suppliers;
      })
    );
  }

  getRawMaterialTypes() {
    if (this.materialTypes.length > 0) return of(this.materialTypes);
    return this.http.get<RawMaterialType[]>(this.baseURL + 'rawmaterials/getrawmaterialtypes').pipe(
      map(types => {
        this.materialTypes = types;
        return types;
      })
    );
  }

  updateRawMaterial(rawMaterial: RawMaterial) {
    return this.http.put(this.baseURL + `rawMaterials/${rawMaterial.id}`, rawMaterial).pipe(
      map( ()=>{
        const index = this.rawMaterials.indexOf(rawMaterial);
        this.rawMaterials[index] = rawMaterial;
      })
    );
  }

  createRawMaterial(rawMaterial: RawMaterial) {
    return this.http.post<RawMaterial>(this.baseURL + 'rawMaterials', rawMaterial).pipe(
      map(material => {
        material.supplier = this.materialSuppliers.find(m => m.id === material.supplierId)!;
        material.type = this.materialTypes.find(t => t.id === material.typeId)!;
        this.rawMaterials.push(material);
        return material;
      })
    )
  }

  deleteRawMaterial(id: number){
    return this.http.delete(this.baseURL + `rawMaterials/${id}`).pipe(
      map( () => {
        const material = this.rawMaterials.find(m => m.id === id);
        if (material){
          const index = this.rawMaterials.indexOf(material);
          this.rawMaterials.splice(index, 1);
        }
      })
    )
  }

  //frontend navigation
  navigateToRawMaterialList(){
    this.router.navigateByUrl('/rawmaterials');
  }

}
