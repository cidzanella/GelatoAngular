import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RawMaterial } from 'src/app/_models/rawmaterial';
import { SorbettoRecipeItem } from 'src/app/_models/sorbettorecipeitem';
import { SorbettoType } from 'src/app/_models/sorbettotype';
import { RawMaterialService } from 'src/app/_services/rawmaterial.service';
import { SorbettoRecipeService } from 'src/app/_services/sorbettorecipe.service';

@Component({
  selector: 'app-sorbettorecipe',
  templateUrl: './sorbettorecipe.component.html',
  styleUrls: ['./sorbettorecipe.component.css']
})
export class SorbettorecipeComponent implements OnInit {

  @Input() sorbettoType: SorbettoType | undefined;

  recipeForm: FormGroup | undefined;
  showEditForm: boolean = false;
  sorbettoRecipe: SorbettoRecipeItem[] = [];
  rawMaterials: RawMaterial[] = [];
  sorbettoRecipeItemEditing: SorbettoRecipeItem | undefined;


  constructor(private _serviceSorbettoRecipe: SorbettoRecipeService,
    private _serviceRawMaterial: RawMaterialService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getActiveRawMaterials();
    this.getSorbettoRecipe(this.sorbettoType?.id);
  }

  initializeForm() {
    this.recipeForm = this.formBuilder.group({
      rawMaterialControl: [null, [Validators.required]],
      sorbettoRecipeControl: [null, [Validators.required]],
      gramsPerKgControl: ['', [Validators.required]],
      recipeItemIdControl: ['', [Validators.required]],
      sorbettoTypeIdControl: [this.sorbettoType?.id, [Validators.required]]
    })
  }

  getSorbettoRecipe(id: number | undefined) {
    if (id) {
      this._serviceSorbettoRecipe.readSorbettoRecipe(id).subscribe(recipe => {
        this.sorbettoRecipe = recipe;
      })
    }
  }

  getActiveRawMaterials(){
    this._serviceRawMaterial.getRawMaterials().subscribe(materials => {
      this.rawMaterials = materials.filter(m => m.active === true);
    })
  }

  showNewItemForm() {
    this.setFormControlsToUndefined();
    this.showEditForm=true;
  }

  onRawMaterialChange(){
    // check if select item is already on the recipe
    let rawMaterialSelected = <RawMaterial>this.recipeForm?.value.rawMaterialControl;
    if (rawMaterialSelected) {
      let indexOfItemOnRecipe = this.getIndexOfItemOnRecipe(rawMaterialSelected); 
      if (indexOfItemOnRecipe !== -1) this.selectItemFromListToEdit(this.sorbettoRecipe[indexOfItemOnRecipe]);
    }
  }

  selectItemFromListToEdit(item: SorbettoRecipeItem){
    this.sorbettoRecipeItemEditing = item;
    const index = this.rawMaterials.findIndex(m => m.id === item.rawMaterialId);
    if (this.recipeForm) {
      this.recipeForm.get("rawMaterialControl")?.setValue(this.rawMaterials[index]);
      this.recipeForm.get("gramsPerKgControl")?.setValue(item.gramsPerKg);
      this.recipeForm.get("recipeItemIdControl")?.setValue(item.id);
      this.recipeForm.get("sorbettoTypeIdControl")?.setValue(item.sorbettoTypeId);
    }
    this.showEditForm = true;
  }

  cancelEditing() {
    this.showEditForm=false;
    this.setFormControlsToUndefined();
  }

  addRecipeItem(){
    this.setSorbettoRecipeItemEditingFromTheForm();
    
    if (this.sorbettoRecipeItemEditing === undefined)  
      return;

    let indexOfItemOnRecipe = this.getIndexOfItemOnRecipe(this.sorbettoRecipeItemEditing.rawMaterial); 

    if (indexOfItemOnRecipe !== -1) {
      if (confirm('Este ingrediente já existe na receita. Deseja alterar a quantidade?')) 
        this.updateRecipeItem();
      return;
    }
    // not in the list yet, add
    this._serviceSorbettoRecipe.createSorbettoRecipeItem(this.sorbettoRecipeItemEditing).subscribe(response =>
      {
        this.sorbettoRecipe.push(response);
        this.sorbettoRecipe.sort((a,b) => (a.rawMaterial.name > b.rawMaterial.name) ? 1 : ((a.rawMaterial.name < b.rawMaterial.name ) ? -1 : 0));
        this.setFormControlsToUndefined();
        this.toastr.show("Added!")
      })

  }

  updateRecipeItem(){
    this.setSorbettoRecipeItemEditingFromTheForm();
    console.log('updating ...');
    console.log(this.sorbettoRecipeItemEditing);

    if (this.sorbettoRecipeItemEditing === undefined) 
      return;

    let indexOfItemOnRecipe = this.getIndexOfItemOnRecipe(this.sorbettoRecipeItemEditing.rawMaterial); 

    this._serviceSorbettoRecipe.updateSorbettoRecipeItem(this.sorbettoRecipeItemEditing).subscribe(
      () => {
          this.sorbettoRecipe[indexOfItemOnRecipe].gramsPerKg = this.sorbettoRecipeItemEditing?.gramsPerKg!;
          this.setFormControlsToUndefined();
          this.toastr.show('Updated.')
      }
    )
  }

  removeRecipeItem(){
    let item = this.sorbettoRecipeItemEditing;
    if (item == undefined)
      return;
    
    let ingredient = item.rawMaterial.name;

    let indexOfItemOnRecipe = this.getIndexOfItemOnRecipe(item.rawMaterial); 
    if (indexOfItemOnRecipe == -1) 
      return;

    if (!confirm(`Deseja remover ${ingredient} da receita?`)) 
    return;
  
    this._serviceSorbettoRecipe.deleteSorbettoRecipeItem(item.id).subscribe( () => {
      this.sorbettoRecipe.splice(indexOfItemOnRecipe,1);
      this.setFormControlsToUndefined();
      this.toastr.show(`${ingredient} removido da receita`);
    })
  }

  // get data from form controls and check if item is already on the recipe list
  setSorbettoRecipeItemEditingFromTheForm(){
    //TODO: validated fields data and required
    var form = this.recipeForm?.value;
    this.sorbettoRecipeItemEditing =  <SorbettoRecipeItem>{
      id: form.recipeItemIdControl,
      sorbettoTypeId: form.sorbettoTypeIdControl,
      rawMaterialId: form.rawMaterialControl.id, 
      rawMaterial: form.rawMaterialControl, 
      gramsPerKg: form.gramsPerKgControl
    }
  }
  
  getIndexOfItemOnRecipe(itemSearched: RawMaterial){
    return this.sorbettoRecipe.findIndex(item => item.rawMaterialId === itemSearched.id);
  }

  setFormControlsToUndefined(){
    this.sorbettoRecipeItemEditing = undefined;  
    this.showEditForm = false;   
    if (this.recipeForm) {
      this.recipeForm.get("rawMaterialControl")?.setValue(null);
      this.recipeForm.get("gramsPerKgControl")?.setValue('');
      this.recipeForm.get("recipeItemIdControl")?.setValue('');
    }    
  }
  
  onListClick(item: SorbettoRecipeItem){
    this.selectItemFromListToEdit(item);
  }

  onListDoubleClick(){
    this.removeRecipeItem();
  }

}
