import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OutputDetailListener } from '../../../../interfaces/OutputDetailListener';
import { OutputProduct } from '../../../../models/outputs/outputs.model';
import { WarehousePipe } from '../../../../../shared/pipes/warehouse.pipe';
import { ProductPipe } from '../../../../../shared/pipes/product.pipe';
import { OutputEntity } from '../../../../../../../domain/entities/inventory/output.entity';

@Component({
  selector: 'app-output-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    WarehousePipe,
    ProductPipe
  ],
  templateUrl : './output-detail.component.html',

})
export class OutputDetailComponent {

  @Input() outputdetailListener? : OutputDetailListener;
  @Input() outputProduct! : OutputEntity;


  close( ) {

    this.outputdetailListener?.close();

  }


}
