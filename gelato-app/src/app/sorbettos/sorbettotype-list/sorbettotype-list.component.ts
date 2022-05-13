import { Component, OnInit } from '@angular/core';
import { SorbettoType } from 'src/app/_models/sorbettotype';
import { SorbettotypeService } from 'src/app/_services/sorbettotype.service';

@Component({
  selector: 'app-sorbettotype-list',
  templateUrl: './sorbettotype-list.component.html',
  styleUrls: ['./sorbettotype-list.component.css']
})
export class SorbettotypeListComponent implements OnInit {

  sorbettoTypes: SorbettoType[] = [];

  constructor(private sorbettoTypeService: SorbettotypeService) { }

  ngOnInit(): void {
    this.getSorbettoTypes();
  }

  getSorbettoTypes(){
    this.sorbettoTypeService.readSorbettoTypes().subscribe(sorbettos => {
      this.sorbettoTypes = sorbettos;
    })
  }

}
