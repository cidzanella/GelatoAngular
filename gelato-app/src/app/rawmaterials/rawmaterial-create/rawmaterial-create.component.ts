import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RawMaterial } from 'src/app/_models/rawmaterial';
import { RawMaterialService } from 'src/app/_services/rawmaterial.service';

@Component({
  selector: 'app-rawmaterial-create',
  templateUrl: './rawmaterial-create.component.html',
  styleUrls: ['./rawmaterial-create.component.css']
})
export class RawmaterialCreateComponent implements OnInit {

  formCreateLabel: string = "Matéria Prima - Nova";
  clearForm: boolean = false;
  rawMaterial: RawMaterial | undefined;

  constructor(private rawMaterialService: RawMaterialService, 
    private toastr: ToastrService) { 
      this.rawMaterial = <RawMaterial>{};
    }

  ngOnInit(): void {
  }

  createRawMaterial(rawMaterial: RawMaterial){
    if (rawMaterial)
      this.rawMaterialService.createRawMaterial(rawMaterial).subscribe(material => {
        this.rawMaterial = material;
        this.toastr.success("Registrado com sucesso!");
        this.clearForm = true;
      })
      this.rawMaterialService.navigateToRawMaterialList();
    }

  cancelCreating(){
    this.toastr.success("Cancelado!");
    this.clearForm = true;
    this.rawMaterialService.navigateToRawMaterialList();
  }

}
