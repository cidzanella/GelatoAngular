import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseRecipeItem } from '../_models/baserecipe';
import { BaseType } from '../_models/basetype';
import { RawMaterial } from '../_models/rawmaterial';
import { BaseRecipeService } from '../_services/base-recipe.service';
import { RawMaterialService } from '../_services/rawmaterial.service';

@Component({
  selector: 'app-baserecipes',
  templateUrl: './baserecipes.component.html',
  styleUrls: ['./baserecipes.component.css']
})
export class BaserecipesComponent implements OnInit {

  baseRecipeForm: FormGroup | undefined;
  showEditForm: boolean = false;
  baseTypes: BaseType[] = [];
  baseTypeSelected: BaseType | undefined;
  baseRecipeSelected: BaseRecipeItem[] = [];
  rawMaterials: RawMaterial[] = [];
  baseRecipeItemEditing: BaseRecipeItem | undefined;

  constructor(private _serviceBaseRecipe: BaseRecipeService, 
    private _serviceRawMaterial: RawMaterialService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getActiveRawMaterials();
    this.getBaseTypes();
  }

  initializeForm() {
    this.baseRecipeForm = this.formBuilder.group({
      baseTypeControl: [null, [Validators.required]],
      rawMaterialControl: [null, [Validators.required]],
      baseRecipeControl: [null, [Validators.required]],
      gramsPerKgControl: ['', [Validators.required]],
      baseRecipeItemIdControl: ['', [Validators.required]]
    })
  }

  getBaseTypes(){
    this._serviceBaseRecipe.getBaseTypes().subscribe(types => {
      this.baseTypes = types;
      this.setFormControlsToUndefined();
    })
  }

  getActiveRawMaterials(){
    this._serviceRawMaterial.getRawMaterials().subscribe(materials => {
      this.rawMaterials = materials.filter(m => m.active === true);
    })
  }

  getBaseRecipe(id: number){
    this._serviceBaseRecipe.getBaseRecipeByBaseType(id).subscribe(items => {
      this.baseRecipeSelected = items;
    })
  }

  addBaseRecipeItem(){
    
    this.setBaseRecipeItemEditingFromTheForm();
    
    if (this.baseRecipeItemEditing === undefined)  
      return;

    let indexOfItemOnRecipe = this.getIndexOfItemOnSelectedRecipe(this.baseRecipeItemEditing.rawMaterial); 

    if (indexOfItemOnRecipe !== -1) {
      if (confirm('Este ingrediente já existe na receita. Deseja alterar a quantidade?')) 
        this.updateBaseRecipeItem();
      return;
    }
    // not in the list yet, add
    this._serviceBaseRecipe.addBaseRecipeItem(this.baseRecipeItemEditing).subscribe(response =>
      {
        this.baseRecipeSelected.push(response);
        this.baseRecipeSelected.sort((a,b) => (a.rawMaterial.name > b.rawMaterial.name) ? 1 : ((a.rawMaterial.name < b.rawMaterial.name ) ? -1 : 0));
        this.setFormControlsToUndefined();
        this.toastr.show("Added!")
      })
  }

  updateBaseRecipeItem(){
    this.setBaseRecipeItemEditingFromTheForm();
    console.log('updating ...');
    console.log(this.baseRecipeItemEditing);

    if (this.baseRecipeItemEditing === undefined) 
      return;

    let indexOfItemOnRecipe = this.getIndexOfItemOnSelectedRecipe(this.baseRecipeItemEditing.rawMaterial); 

    this._serviceBaseRecipe.updateBaseRecipeItem(this.baseRecipeItemEditing).subscribe(
      () => {
          this.baseRecipeSelected[indexOfItemOnRecipe].gramsPerKg = this.baseRecipeItemEditing?.gramsPerKg!;
          this.setFormControlsToUndefined();
          this.toastr.show('Updated.')
      }
    )
  }

  removeBaseRecipeItem(){
    let item = this.baseRecipeItemEditing;
    if (item == undefined)
      return;
    
    let ingredient = item.rawMaterial.name;

    let indexOfItemOnRecipe = this.getIndexOfItemOnSelectedRecipe(item.rawMaterial); 
    if (indexOfItemOnRecipe == -1) 
      return;

    if (!confirm(`Deseja remover ${ingredient} da receita?`)) 
    return;
  
    this._serviceBaseRecipe.deleteBaseRecipeItem(item).subscribe( () => {
      this.baseRecipeSelected.splice(indexOfItemOnRecipe,1);
      this.setFormControlsToUndefined();
      this.toastr.show(`${ingredient} removido da receita`);
    })
  }
  
  // get data from form controls and check if item is already on the recipe list
  setBaseRecipeItemEditingFromTheForm(){
    //TODO: validated fields data and required
    var form = this.baseRecipeForm?.value;
    this.baseRecipeItemEditing =  <BaseRecipeItem>{
      baseTypeId: form.baseTypeControl.id,
      rawMaterialId: form.rawMaterialControl.id, 
      rawMaterial: form.rawMaterialControl, 
      gramsPerKg: form.gramsPerKgControl,
      id: form.baseRecipeItemIdControl
    }
  }

  setFormControlsToUndefined(){
    this.baseRecipeItemEditing = undefined;  
    this.showEditForm = false;   
    if (this.baseRecipeForm) {
      this.baseRecipeForm.get("rawMaterialControl")?.setValue(null);
      this.baseRecipeForm.get("gramsPerKgControl")?.setValue('');
      this.baseRecipeForm.get("baseRecipeItemIdControl")?.setValue('');
      // this.baseRecipeForm.controls["rawMaterialControl"].setValue(null);
      // this.baseRecipeForm.controls["gramsPerKgControl"].setValue('');
      // this.baseRecipeForm.controls["baseRecipeItemIdControl"].setValue('');
    }    
  }
  
  getIndexOfItemOnSelectedRecipe(itemSearched: RawMaterial){
    return this.baseRecipeSelected.findIndex(item => item.rawMaterialId === itemSearched.id);
  }

  onBaseTypeChange(event:any) {
    console.log('event:');
    console.log(event.target.value.name);
    this.cancelEditing();
    this.baseTypeSelected = <BaseType>this.baseRecipeForm?.value.baseTypeControl;
    if (this.baseTypeSelected)
      this.getBaseRecipe(this.baseTypeSelected.id);
  }

  onGridClick(item: BaseRecipeItem){
    this.selectItemFromListToEdit(item);
    console.log('baseTypeSelected');
    console.log(this.baseTypeSelected);
  }

  showNewItemForm(){
    this.setFormControlsToUndefined();
    this.showEditForm=true;
  }

  selectItemFromListToEdit(item: BaseRecipeItem){
    console.log('selectItemFromListToEdit');
    console.log(item);
    this.baseRecipeItemEditing = item;
    console.log(this.baseRecipeItemEditing);
    const index = this.rawMaterials.findIndex(m => m.id === item.rawMaterialId);
    if (this.baseRecipeForm) {
      this.baseRecipeForm.get("rawMaterialControl")?.setValue(this.rawMaterials[index]);
      this.baseRecipeForm.get("gramsPerKgControl")?.setValue(item.gramsPerKg);
      this.baseRecipeForm.get("baseRecipeItemIdControl")?.setValue(item.id);
      // this.baseRecipeForm.controls["rawMaterialControl"].setValue(this.rawMaterials[index]);
      // this.baseRecipeForm.controls["gramsPerKgControl"].setValue(item.gramsPerKg);
      // this.baseRecipeForm.controls["baseRecipeItemIdControl"].setValue(item.id);
    }
    this.showEditForm = true;
  }

  onGridDoubleClick(){
    this.removeBaseRecipeItem();
  }

  onRawMaterialChange(){
    // check if select item is already on the recipe
    let rawMaterialSelected = <RawMaterial>this.baseRecipeForm?.value.rawMaterialControl;
    if (rawMaterialSelected) {
      let indexOfItemOnRecipe = this.getIndexOfItemOnSelectedRecipe(rawMaterialSelected); 

      if (indexOfItemOnRecipe !== -1) this.selectItemFromListToEdit(this.baseRecipeSelected[indexOfItemOnRecipe]);
  
    }
  }

  cancelEditing(){
    this.showEditForm = false;   
    this.setFormControlsToUndefined();
  }
}