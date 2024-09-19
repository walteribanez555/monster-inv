import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../../shared/models/modal-content';

@Component({
  selector: 'app-modal-orders',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-orders.component.html',

})
export class ModalOrdersComponent implements ModalContent {
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;
}
