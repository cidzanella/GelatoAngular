import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SorbettoType } from 'src/app/_models/sorbettotype';
import { SorbettoRecipeService } from 'src/app/_services/sorbettorecipe.service';
import { SorbettotypeService } from 'src/app/_services/sorbettotype.service';

@Component({
  selector: 'app-sorbettotype-create',
  templateUrl: './sorbettotype-create.component.html',
  styleUrls: ['./sorbettotype-create.component.css']
})
export class SorbettotypeCreateComponent implements OnInit {

  formCreateLabel: string = "Sorbetto - Novo";
  sorbettoType: SorbettoType | undefined;
  formDirty: boolean = false;

  constructor(private sorbettoTypeService: SorbettotypeService,
    private sorbettoRecipeService: SorbettoRecipeService,
    private toastr: ToastrService) { 
      this.sorbettoType = <SorbettoType>{};
    }

  ngOnInit(): void {
  }

  //create
  createSorbettoType(sorbettoType: SorbettoType){
    if(sorbettoType){
      this.sorbettoTypeService.createSorbettoType(sorbettoType).subscribe(sorbetto => {
        this.sorbettoType = sorbetto;
        this.toastr.success("Registrado com sucesso!");
      })
    }
  }

  
  deleteSorbettoType(sorbettoType: SorbettoType){
    if (sorbettoType) {
      // delete sorbetto type recipe itens
      this.sorbettoRecipeService.deleteSorbettoRecipe(sorbettoType.id).subscribe( () => {
        this.toastr.success("Itens da receita excluídos com sucesso!");
      })
      // delete sorbetto type
      this.sorbettoTypeService.deleteSorbettoType(sorbettoType.id).subscribe( () => {
        this.toastr.success("Excluído com sucesso!");
        // this.resetForm = true;
      })
    }
    this.sorbettoTypeService.navigateToSorbettoTypeList();
  }

  //cancel
  cancelCreating(){
    if (this.formDirty) this.toastr.warning("Cancelado!");
    this.backToList();
  }
  
  //navegate to list
  backToList() {
    // clearForm ?
    this.sorbettoTypeService.navigateToSorbettoTypeList();
  }

  isFormDirty(event: boolean){
    this.formDirty = event;
  }

}
