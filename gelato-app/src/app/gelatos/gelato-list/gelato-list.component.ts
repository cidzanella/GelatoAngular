import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gelato-list',
  templateUrl: './gelato-list.component.html',
  styleUrls: ['./gelato-list.component.css']
})
export class GelatoListComponent implements OnInit {

  constructor() { }
  isCollapsed: boolean = false;

  ngOnInit(): void {
  }

}
