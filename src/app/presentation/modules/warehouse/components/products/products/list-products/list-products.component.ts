import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ItemListProductsComponent } from '../item-list-products/item-list-products.component';
import { ProductTypeEntity } from '../../../../../../../domain/entities/inventory/product-type.entity';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, ItemListProductsComponent],
  templateUrl: './list-products.component.html',
})
export class ListProductsComponent {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }



  @Input() productTypes! : ProductTypeEntity[];

  @Output() onSelectItem = new EventEmitter();

  onSelectTable(productType : ProductTypeEntity) {
    this.onSelectItem.emit(productType);
  }
}
