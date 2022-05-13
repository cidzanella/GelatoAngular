import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GelatoRecipe } from 'src/app/_models/gelatorecipe';
import { GelatoRecipeService } from 'src/app/_services/gelatorecipe.service';

@Component({
  selector: 'app-gelato-update',
  templateUrl: './gelato-update.component.html',
  styleUrls: ['./gelato-update.component.css']
})

export class GelatoUpdateComponent implements OnInit {

  formUpdateLabel = "Gelato - Atualizar";
  resetForm: boolean = false;
  gelatoRecipeToUpdate: GelatoRecipe | undefined;
  formDirty: boolean = false;

  constructor(private gelatoRecipeService: GelatoRecipeService, 
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getGelatoRecipeToUpdate();
  }

  getGelatoRecipeToUpdate(){
    let id: number = Number(this.route.snapshot.paramMap.get('id')) || 0;

    if (id > 0 ) {
      this.gelatoRecipeService.readGelatoRecipe(id).subscribe(recipe => {
        this.gelatoRecipeToUpdate = recipe;
      });
    } else {
      this.gelatoRecipeToUpdate = <GelatoRecipe>{};
    }
  }

  updateGelatoRecipe(gelatoRecipe: GelatoRecipe) {
    //to pull the OnChange trigger and provoque the event 
    // calling when setting property to true down below
    this.resetForm = false; 

    if(gelatoRecipe) {
      this.gelatoRecipeService.updateGelatoRecipe(gelatoRecipe).subscribe(() => {
        this.toastr.success('Registrado com sucesso!');
        this.resetForm = true;
      })
    }
    this.gelatoRecipeService.navigateToGelatoList();
  }

  cancelUpdating() {
    this.toastr.warning("Atualização cancelada!");
    this.gelatoRecipeService.navigateToGelatoList();
  }

  isFormDirty(event: boolean){
    this.formDirty = event;
  }

}
