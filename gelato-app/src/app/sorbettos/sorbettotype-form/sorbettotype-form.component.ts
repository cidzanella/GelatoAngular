import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SorbettoType } from 'src/app/_models/sorbettotype';
import { SorbettotypeService } from 'src/app/_services/sorbettotype.service';

@Component({
  selector: 'app-sorbettotype-form',
  templateUrl: './sorbettotype-form.component.html',
  styleUrls: ['./sorbettotype-form.component.css']
})
export class SorbettotypeFormComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm | undefined;

  @Input() formMainLabel: string | undefined;
  @Input() isToResetForm: boolean = false;
  @Input() sorbettoType: SorbettoType | undefined;

  @Output() cancelEditing = new EventEmitter();
  @Output() registerSorbettoType = new EventEmitter();
  @Output() formDirty = new EventEmitter();
  @Output() deleteSorbettoType = new EventEmitter();

  constructor(private sorbettoTypeService: SorbettotypeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.editForm?.form.markAsPristine();
    this.registerSorbettoType.emit(this.sorbettoType);
  }

  cancel(){
    this.cancelEditing.emit();
  }

  delete(){
    this.deleteSorbettoType.emit(this.sorbettoType);
  }
  
  dirty() {
    this.formDirty.emit(this.editForm?.dirty);
  }

}
