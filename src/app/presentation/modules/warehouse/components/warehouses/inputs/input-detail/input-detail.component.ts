import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputDetailListener } from '../../../../interfaces/InputDetailListener';
import { InputProduct } from '../../../../models/inputs/inputs.model';
import { InputEntity } from '../../../../../../../domain/entities/inventory/input.entity';
import { ProductPipe } from '../../../../../shared/pipes/product.pipe';
import { WarehousePipe } from '../../../../../shared/pipes/warehouse.pipe';
import { ProviderPipe } from '../../../../../shared/pipes/provider.pipe';

@Component({
  selector: 'app-input-detail',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    ProductPipe,
    WarehousePipe,
    ProviderPipe,
  ],
  templateUrl : './input-detail.component.html',

})
export class InputDetailComponent {


  @Input() inputDetailListener? : InputDetailListener;
  @Input() inputProduct! : InputEntity;

  close() {
    this.inputDetailListener?.close();
  }

 }
