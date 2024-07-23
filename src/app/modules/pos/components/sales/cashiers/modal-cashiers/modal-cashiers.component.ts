import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../../../shared/models/modal-content';

@Component({
  selector: 'app-modal-cashiers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-cashiers.component.html',
})
export class ModalCashiersComponent implements ModalContent {
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;
}
