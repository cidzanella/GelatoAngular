import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  public gelatos: any;

  constructor() { }

  ngOnInit(): void {
    this.gelatos = [
      { cuba: '#01', flavour: "Torta Belga", quantityInGrams: 2.150 },
      { cuba: '#02', flavour: "Pistacchio", quantityInGrams: 2.150 },
      { cuba: '#03', flavour: "Fragola", quantityInGrams: 2.150 },
      { cuba: '#04', flavour: "Ninho", quantityInGrams: 2.150 },
      { cuba: '#05', flavour: "Cremino", quantityInGrams: 2.150 },
      { cuba: '#06', flavour: "Brigadeiro Belga", quantityInGrams: 2.150 },
      { cuba: '#07', flavour: "Yogurt all'Amarena", quantityInGrams: 2.150 },
      { cuba: '#08', flavour: "Dom Cavallo", quantityInGrams: 2.150 },
      { cuba: '#09', flavour: "Mandorla Tostata", quantityInGrams: 2.150 },
      { cuba: '#10', flavour: "Nocciolino", quantityInGrams: 2.150 },
      { cuba: '#11', flavour: "Frutto della Passione", quantityInGrams: 2.150 },
      { cuba: '#12', flavour: "Uva", quantityInGrams: 2.150 },
      { cuba: '#13', flavour: "Abacaxi com Hortelã", quantityInGrams: 2.150 },
      { cuba: '#14', flavour: "La Mora", quantityInGrams: 2.150 },
      { cuba: '#15', flavour: "Vaniglia Bourbon", quantityInGrams: 2.150 },
      { cuba: '#16', flavour: "Caramello Salato", quantityInGrams: 2.150 },
      { cuba: '#17', flavour: "Perdonato", quantityInGrams: 2.150 },
      { cuba: '#18', flavour: "Stracciatella", quantityInGrams: 2.150 }
    ];

  }

}
