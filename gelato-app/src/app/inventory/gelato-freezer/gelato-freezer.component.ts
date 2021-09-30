import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gelato-freezer',
  templateUrl: './gelato-freezer.component.html',
  styleUrls: ['./gelato-freezer.component.css']
})

export class GelatoFreezerComponent implements OnInit {
  
  public gelatos: any;

  constructor() { 
  }

  ngOnInit(): void {
    this.gelatos = [
      { cuba: '#01', flavour: "Torta Belga", quantityInGrams: 2000.75 },
      { cuba: '#02', flavour: "Pistacchio", quantityInGrams: 2750.20 },
      { cuba: '#03', flavour: "Fragola", quantityInGrams: 2430.10 },
      { cuba: '#04', flavour: "Ninho", quantityInGrams: 1930.70 },
      { cuba: '#05', flavour: "Cremino", quantityInGrams: 1450.00 },
      { cuba: '#06', flavour: "Brigadeiro Belga", quantityInGrams: 1240.25 },
      { cuba: '#07', flavour: "Yogurt all'Amarena", quantityInGrams: 3120.10 },
      { cuba: '#08', flavour: "Dom Cavallo", quantityInGrams: 2500 },
      { cuba: '#09', flavour: "Mandorla Tostata", quantityInGrams: 2500 },
      { cuba: '#10', flavour: "Nocciolino", quantityInGrams: 2500 },
      { cuba: '#11', flavour: "Frutto della Passione", quantityInGrams: 2500 },
      { cuba: '#12', flavour: "Uva", quantityInGrams: 2500 },
      { cuba: '#13', flavour: "Abacaxi com Hortelã", quantityInGrams: 2500 },
      { cuba: '#14', flavour: "La Mora", quantityInGrams: 2500 },
      { cuba: '#15', flavour: "Vaniglia Bourbon", quantityInGrams: 2500 },
      { cuba: '#16', flavour: "Caramello Salato", quantityInGrams: 2500 },
      { cuba: '#17', flavour: "Perdonato", quantityInGrams: 2500 },
      { cuba: '#18', flavour: "Stracciatella", quantityInGrams: 2500 },
      { cuba: '#19', flavour: "Malaga", quantityInGrams: 2500 },
      { cuba: '#20', flavour: "Ovomaltine", quantityInGrams: 2500 }
    ];

  }
}
