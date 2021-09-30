import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { RawMaterial } from 'src/app/_models/rawmaterial';
import { RawMaterialSupplier } from 'src/app/_models/rawmaterialsupplier';
import { RawMaterialType } from 'src/app/_models/rawmaterialtype';
import { RawMaterialService } from 'src/app/_services/rawmaterial.service';

@Component({
  selector: 'app-rawmaterial-form',
  templateUrl: './rawmaterial-form.component.html',
  styleUrls: ['./rawmaterial-form.component.css']
})

export class RawmaterialFormComponent implements OnInit {
  
  @ViewChild('editForm') editForm: NgForm | undefined;

  rawMaterial:  RawMaterial | undefined;
  rawMaterialSuppliers: RawMaterialSupplier[] = [];
  rawMaterialTypes: RawMaterialType[] = [];

  constructor(private rawMaterialService: RawMaterialService, private route: ActivatedRoute, 
    private toastr: ToastrService) { 
      this.rawMaterial = <RawMaterial>{} 
  }

  ngOnInit(): void {
    this.getRawMaterial();
    this.getRawMaterialSuppliers();
    this.getRawMaterialTypes();
  }

  getRawMaterial(){
    let id: number = Number(this.route.snapshot.paramMap.get('id')) || 0;

    if (id > 0) {
      this.rawMaterialService.getRawMaterial(id).subscribe(material => {
        this.rawMaterial = material;
      })
    } else {
      this.rawMaterial = <RawMaterial>{} ;
    }
  }

  getRawMaterialSuppliers(){
    this.rawMaterialService.getRawMaterialSuppliers().subscribe(suppliers => {
      this.rawMaterialSuppliers = suppliers;
      console.debug(this.rawMaterialSuppliers)
    });
  }

  getRawMaterialTypes(){
    this.rawMaterialService.getRawMaterialTypes().subscribe(types => {
      this.rawMaterialTypes = types;
    });
  }

  updateRawMaterial(){
    if (this.rawMaterial) {
      this.rawMaterialService.updateRawMaterial(this.rawMaterial).subscribe(() => {
        this.toastr.success('Registrado com sucesso!');
        if (this.editForm) this.editForm.reset(this.rawMaterial);
      })
    }
  }
}
