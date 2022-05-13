import { Component, OnInit } from '@angular/core';
import { GelatoRecipe } from 'src/app/_models/gelatorecipe';
import { GelatoRecipeService } from 'src/app/_services/gelatorecipe.service';

@Component({
  selector: 'app-gelato-list',
  templateUrl: './gelato-list.component.html',
  styleUrls: ['./gelato-list.component.css']
})
export class GelatoListComponent implements OnInit {

  gelatoRecipesList: GelatoRecipe[] =[];

  constructor(private gelatoRecipeService: GelatoRecipeService) { }
  
  ngOnInit(): void {
    this.getGelatoRecipes();
  }

  getGelatoRecipes() {
    this.gelatoRecipeService.readGelatoRecipes().subscribe(gelatos => {
      this.gelatoRecipesList = gelatos;
    });
  }

  // onGelatoRecipesClick(gelato: GelatoRecipe){

  // }
}
