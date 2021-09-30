import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RawMaterial } from 'src/app/_models/rawmaterial';
import { RawMaterialService } from 'src/app/_services/rawmaterial.service';

@Component({
  selector: 'app-rawmaterial-list',
  templateUrl: './rawmaterial-list.component.html',
  styleUrls: ['./rawmaterial-list.component.css']
})
export class RawmaterialListComponent implements OnInit {

  rawMaterialsList: RawMaterial[] = [];

  constructor(public materialService: RawMaterialService) { }

  ngOnInit(): void {
    this.getRawMaterials();    
  }

  getRawMaterials(){
    this.materialService.getRawMaterials().subscribe(materials => {
      this.rawMaterialsList = materials;
    });
  }

  onRawMaterialClick(material: RawMaterial){
  }
}
