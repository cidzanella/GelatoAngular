import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GelatoRecipe } from 'src/app/_models/gelatorecipe';
import { GelatoRecipeService } from 'src/app/_services/gelatorecipe.service';

@Component({
  selector: 'app-gelato-create',
  templateUrl: './gelato-create.component.html',
  styleUrls: ['./gelato-create.component.css']
})
export class GelatoCreateComponent implements OnInit {

  formCreateLabel = "Gelato - Novo";
  clearForm: boolean = false;
  gelatoRecipe: GelatoRecipe | undefined;
  formDirty: boolean = false;

  constructor(private gelatoRecipeService: GelatoRecipeService, 
    private toastr: ToastrService ) {
      this.gelatoRecipe = <GelatoRecipe>{};
    }

  ngOnInit(): void {
  }

  createGelatoRecipe(gelatoRecipe: GelatoRecipe) {
    if (gelatoRecipe)
      this.gelatoRecipeService.createGelatoRecipe(gelatoRecipe).subscribe(recipe => {
        this.gelatoRecipe = recipe;
        this.toastr.success("Registrado com sucesso!");
        this.clearForm = true;
      })
    this.gelatoRecipeService.navigateToGelatoList();
  }

  cancelCreating(){
    this.toastr.success("Cancelado!");
    this.clearForm = true;
    this.gelatoRecipeService.navigateToGelatoList();
  }
  
  isFormDirty(event: boolean){
    this.formDirty = event;
  }

}
