import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from "angular-svg-icon";

@Component({
  selector: 'app-process-list-recipes',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl : './process-list-recipes.component.html',
})
export class ProcessListRecipesComponent {
  displayList : boolean  = true;


  onDisplayList() {
    this.displayList = !this.displayList;
  }


 }
