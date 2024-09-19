import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../../../../models/categories/Category';

@Component({
  selector: '[item-list-categories]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './item-list-categories.component.html',
})
export class ItemListCategoriesComponent {


    @Input() category! : Category;


}
