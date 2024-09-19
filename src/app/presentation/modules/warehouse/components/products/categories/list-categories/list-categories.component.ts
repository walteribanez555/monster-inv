import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../models/categories/Category';
import { ItemListCategoriesComponent } from '../item-list-categories/item-list-categories.component';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [
    CommonModule,
    ItemListCategoriesComponent,
  ],
  templateUrl : './list-categories.component.html',

})
export class ListCategoriesComponent {


  @Output() onSelectItem = new EventEmitter();

  @Input() categories! : Category[];

  onSelectTable(category : Category) {
    this.onSelectItem.emit(category);
  }



}
