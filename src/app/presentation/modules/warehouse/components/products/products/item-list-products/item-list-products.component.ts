import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductTypeEntity } from '../../../../../../../domain/entities/inventory/product-type.entity';
import { TypeStatusPipe } from '../../../../../shared/pipes/type-status.pipe';
import { TypeProductPipe } from '../../../../../shared/pipes/type-product.pipe';

@Component({
  selector: '[item-list-products]',
  standalone: true,
  imports: [
    CommonModule,
    TypeStatusPipe,
    TypeProductPipe,
  ],
  templateUrl : './item-list-products.component.html',

})
export class ItemListProductsComponent {


  @Input() product! : ProductTypeEntity;

 }
