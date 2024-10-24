import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PreparationEntity } from '../../../../../../domain/entities/process/preparation.entity';
import { ProductPipe } from '../../../../shared/pipes/product.pipe';
import { WarehousePipe } from '../../../../shared/pipes/warehouse.pipe';
import { TypeProductPipe } from '../../../../shared/pipes/type-product.pipe';

@Component({
  selector: '[item-list-preparation]',
  standalone: true,
  imports: [
    CommonModule,
    ProductPipe,
    WarehousePipe,
    TypeProductPipe,
    DatePipe,
  ],
  templateUrl : './item-list-preparation.component.html',
})
export class ItemListPreparationComponent {

  @Input() preparation! : PreparationEntity


 }
