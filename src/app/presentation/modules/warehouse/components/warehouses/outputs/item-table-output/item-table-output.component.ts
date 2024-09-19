import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OutputProduct } from '../../../../models/outputs/outputs.model';
import { OutputEntity } from '../../../../../../../domain/entities/inventory/output.entity';
import { ProductPipe } from '../../../../../shared/pipes/product.pipe';
import { ProviderPipe } from '../../../../../shared/pipes/provider.pipe';
import { WarehousePipe } from '../../../../../shared/pipes/warehouse.pipe';

@Component({
  selector: '[item-table-output]',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    ProductPipe,
    WarehousePipe,
    ProviderPipe,
  ],
  templateUrl : './item-table-output.component.html',

})
export class ItemTableOutputComponent {

  @Input() outputProduct! : OutputEntity;




 }
