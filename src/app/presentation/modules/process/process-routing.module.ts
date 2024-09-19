import { Router, RouterModule, Routes } from "@angular/router";
import { ProcessComponent } from "./process.component";
import { PreparationComponent } from "./pages/preparation/preparation.component";
import { RecipesComponent } from "./pages/recipes/recipes.component";
import { NgModule } from "@angular/core";


const routes : Routes = [
  {
    path : '',
    component : ProcessComponent,
    children: [
      {path :'', redirectTo :'preparation', pathMatch: 'full'},
      {path: 'preparation', component : PreparationComponent,},
      {path: 'recipes' , component : RecipesComponent },
      {path : '**' , redirectTo : 'errors/404'}
    ]
  }
]
@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule],
})
export class ProcessRoutingModule{}
