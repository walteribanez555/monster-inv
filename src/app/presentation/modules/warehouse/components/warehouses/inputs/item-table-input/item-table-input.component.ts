import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputEntity } from '../../../../../../../domain/entities/inventory/input.entity';
import { WarehousePipe } from '../../../../../shared/pipes/warehouse.pipe';
import { ProviderPipe } from '../../../../../shared/pipes/provider.pipe';
import { TypeProductPipe } from '../../../../../shared/pipes/type-product.pipe';
import { ProductPipe } from '../../../../../shared/pipes/product.pipe';

@Component({
  selector: '[item-table-input]',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    WarehousePipe,
    ProviderPipe,
    ProductPipe,
  ],
  templateUrl : './item-table-input.component.html',

})
export class ItemTableInputComponent {

  @Input()  inputProduct! : InputEntity;
  @Input() index! : number;



 }
