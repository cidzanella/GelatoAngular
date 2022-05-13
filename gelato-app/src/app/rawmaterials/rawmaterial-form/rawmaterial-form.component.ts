import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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

export class RawmaterialFormComponent implements OnInit, OnChanges {
  
  @ViewChild('editForm') editForm: NgForm | undefined;

  @Input() formMainLabel: string | undefined;
  @Input() isToResetForm: boolean = false;
  @Input() rawMaterial: RawMaterial | undefined;

  @Output() cancelEditing = new EventEmitter();
  @Output() registerRawMaterial = new EventEmitter();
  @Output() formDirty = new EventEmitter();
  @Output() deleteRawMaterial = new EventEmitter();

  rawMaterialSuppliers: RawMaterialSupplier[] = [];
  rawMaterialTypes: RawMaterialType[] = [];

  constructor(private rawMaterialService: RawMaterialService, private route: ActivatedRoute, 
    private toastr: ToastrService) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isToResetForm) {
      if (this.editForm) this.editForm.reset(this.rawMaterial);
      this.isToResetForm = false;
    }
  }

  ngOnInit(): void {
    this.getRawMaterialSuppliers();
    this.getRawMaterialTypes();
  }

  getRawMaterialSuppliers(){
    this.rawMaterialService.getRawMaterialSuppliers().subscribe(suppliers => {
      this.rawMaterialSuppliers = suppliers;
    });
  }

  getRawMaterialTypes(){
    this.rawMaterialService.getRawMaterialTypes().subscribe(types => {
      this.rawMaterialTypes = types;
    });
  }

  register(){
    this.registerRawMaterial.emit(this.rawMaterial);
  }

  cancel() {
    this.cancelEditing.emit();
  }

  delete() {
    this.deleteRawMaterial.emit(this.rawMaterial);
  }

  dirty() {
    console.log('form.dirty()');
    this.formDirty.emit(this.editForm?.dirty);
  }
}
