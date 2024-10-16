import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipesHeaderComponent } from '../../components/recipes/recipes-header/recipes-header.component';
import { ListRecipesComponent } from '../../components/recipes/list-recipes/list-recipes.component';
import { PreparationHeaderComponent } from "../../components/preparation/preparation-header/preparation-header.component";
import { ListPreparationComponent } from "../../components/preparation/list-preparation/list-preparation.component";

@Component({
  selector: 'app-preparation',
  standalone: true,
  imports: [
    CommonModule,
    RecipesHeaderComponent,
    ListRecipesComponent,
    PreparationHeaderComponent,
    ListPreparationComponent
],
  templateUrl : './preparations.component.html',

})
export class PreparationsComponent {

  onShowItem: boolean  = false;

}
