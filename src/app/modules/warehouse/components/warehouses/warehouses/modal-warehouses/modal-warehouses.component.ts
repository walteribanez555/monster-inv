import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalContent } from '../../../../../../shared/models/modal-content';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-warehouses',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-warehouses.component.html',
})
export class ModalWarehousesComponent implements ModalContent {
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;
 }
