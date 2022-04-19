import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RawMaterial } from 'src/app/_models/rawmaterial';
import { RawMaterialService } from 'src/app/_services/rawmaterial.service';

@Component({
  selector: 'app-rawmaterial-update',
  templateUrl: './rawmaterial-update.component.html',
  styleUrls: ['./rawmaterial-update.component.css']
})
export class RawmaterialUpdateComponent implements OnInit {

  formUpdateLabel = "Matéria Prima - Atualizar";
  resetForm: boolean = false;
  rawMaterialToUpdate: RawMaterial | undefined;
  formDirty: boolean = false;

  constructor(private rawMaterialService: RawMaterialService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRawMaterialToUpdate();
  }

  getRawMaterialToUpdate(){
    let id: number = Number(this.route.snapshot.paramMap.get('id')) || 0;

    if (id > 0) {
      this.rawMaterialService.getRawMaterial(id).subscribe(material => {
        this.rawMaterialToUpdate = material;
      })
    } else {
      this.rawMaterialToUpdate = <RawMaterial>{};
    }

  }

  updateRawMaterial(rawMaterial: RawMaterial){

    this.resetForm = false; //to pull the OnChange trigger and provoque the event calling when setting property to true down below

    if (rawMaterial) {
      this.rawMaterialService.updateRawMaterial(rawMaterial).subscribe(() => {
        this.toastr.success('Registrado com sucesso!');
        this.resetForm = true;
      })
    }
    this.rawMaterialService.navigateToRawMaterialList();
  }

  cancelUpdating(){
    this.toastr.warning("Atualização cancelada!");
    this.rawMaterialService.navigateToRawMaterialList();
  }

  isFormDirty(event: boolean){
    this.formDirty = event;
  }
}
