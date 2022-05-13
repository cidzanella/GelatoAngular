import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SorbettoType } from 'src/app/_models/sorbettotype';
import { SorbettoRecipeService } from 'src/app/_services/sorbettorecipe.service';
import { SorbettotypeService } from 'src/app/_services/sorbettotype.service';

@Component({
  selector: 'app-sorbettotype-update',
  templateUrl: './sorbettotype-update.component.html',
  styleUrls: ['./sorbettotype-update.component.css']
})
export class SorbettotypeUpdateComponent implements OnInit {

  formUpdateLabel: string = "Sorbetto - Atualizar";
  resetForm: boolean = false;
  sorbettoTypeToUpdate: SorbettoType | undefined;
  formDirty: boolean = false;
  
  constructor(private sorbettoTypeService: SorbettotypeService,
    private sorbettoRecipeService: SorbettoRecipeService,
    private route: ActivatedRoute,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getSorbettoTypeToUpdate();
  }

  getSorbettoTypeToUpdate(){
    let id: number = Number(this.route.snapshot.paramMap.get('id')) ||0;

    if (id >0) {
      this.sorbettoTypeService.readSorbettoType(id).subscribe(sorbetto => {
        this.sorbettoTypeToUpdate = sorbetto;
      })
    } else {
      this.sorbettoTypeToUpdate = <SorbettoType>{};
    }
  }

  updateSorbettoType(sorbettoType: SorbettoType){
    //to pull the OnChange trigger and provoque the event 
    // calling when setting property to true down below
    this.resetForm = false;

    if (sorbettoType) {
      this.sorbettoTypeService.updateSorbettoType(sorbettoType.id, sorbettoType).subscribe(() => {
        this.toastr.success('Registrado com sucesso!');
        this.resetForm = true;
      })
    }
    this.sorbettoTypeService.navigateToSorbettoTypeList();
  }

  cancelUpdating(){
    if (this.formDirty) this.toastr.warning("Atualização cancelada!");
    this.sorbettoTypeService.navigateToSorbettoTypeList();
  }

  deleteSorbettoType(sorbettoType: SorbettoType){
    if (sorbettoType) {
      // delete sorbetto type recipe itens
      this.sorbettoRecipeService.deleteSorbettoRecipe(sorbettoType.id).subscribe( () => {
        this.toastr.success("Itens da receita excluídos com sucesso!");
      })
      // delete sorbetto type
      this.sorbettoTypeService.deleteSorbettoType(sorbettoType.id).subscribe( () => {
        this.toastr.success("Sorbetto excluído com sucesso!");
        this.resetForm = true;
      })
    }
    this.sorbettoTypeService.navigateToSorbettoTypeList();
  }

  isFormDirty(event: boolean) {
    this.formDirty = event;
  }

}
