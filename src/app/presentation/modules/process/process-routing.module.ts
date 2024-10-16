import { Router, RouterModule, Routes } from '@angular/router';
import { ProcessComponent } from './process.component';
import { PreparationsComponent } from './pages/preparations/preparations.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { NgModule } from '@angular/core';
import { PreparationComponent } from './pages/preparation/preparation.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessComponent,
    children: [
      { path: '', redirectTo: 'preparation', pathMatch: 'full' },
      { path: 'preparations', component: PreparationsComponent },
      { path: 'recipes', component: RecipesComponent },
      { path: 'preparations/create', component: PreparationComponent },
      { path: 'preparations/view/:id', component: PreparationComponent,},
      { path: 'recipes/create', component: RecipeComponent },
      { path: 'recipes/view/:id', component: RecipeComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessRoutingModule {}
