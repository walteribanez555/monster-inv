import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductEntity } from '../../../../../../../domain/entities/inventory/product.entity';
import { WarehousePipe } from '../../../../../shared/pipes/warehouse.pipe';
import { ProductPipe } from '../../../../../shared/pipes/product.pipe';

@Component({
  selector: '[item-list-products-warehouse]',
  standalone: true,
  imports: [
    CommonModule,
    WarehousePipe,
    ProductPipe
  ],
  templateUrl : './item-list-products-warehouse.component.html',
})
export class ItemListProductsWarehouseComponent {


@Input() product! : ProductEntity;


 }
