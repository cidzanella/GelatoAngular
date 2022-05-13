import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseType } from 'src/app/_models/basetype';
import { GelatoRecipe } from 'src/app/_models/gelatorecipe';
import { RawMaterial } from 'src/app/_models/rawmaterial';
import { BaseRecipeService } from 'src/app/_services/base-recipe.service';
import { GelatoRecipeService } from 'src/app/_services/gelatorecipe.service';
import { RawMaterialService } from 'src/app/_services/rawmaterial.service';

@Component({
  selector: 'app-gelato-form',
  templateUrl: './gelato-form.component.html',
  styleUrls: ['./gelato-form.component.css']
})

export class GelatoFormComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm | undefined;
  
  @Input() formMainLabel: string | undefined;
  @Input() isToResetForm: boolean = false;
  @Input() gelatoRecipe: GelatoRecipe | undefined;

  @Output() cancelEditing = new EventEmitter();
  @Output() registerGelatoRecipe = new EventEmitter();
  @Output() formDirty = new EventEmitter();

  rawMaterials: RawMaterial[] = [];
  baseTypes: BaseType[] =[];

  constructor(private gelatoRecipeService: GelatoRecipeService,
    private rawMaterialService: RawMaterialService,
    private baseRecipeService: BaseRecipeService,
    private route: ActivatedRoute, 
    private toastr: ToastrService ) {
  }

  ngOnInit(): void {
    this.getBaseTypes();
    this.getRawMaterials();
  }

  getRawMaterials(){
    this.rawMaterialService.getRawMaterials().subscribe(materials => {
      this.rawMaterials = materials;
    });
  }

  getBaseTypes(){
    this.baseRecipeService.getBaseTypes().subscribe(types => {
      this.baseTypes = types;
    });
  }

  register() {
    this.registerGelatoRecipe.emit(this.gelatoRecipe);
  }

  cancel() {
    this.cancelEditing.emit();
  }

  dirty() {
    this.formDirty.emit(this.editForm?.dirty);
  }

}
