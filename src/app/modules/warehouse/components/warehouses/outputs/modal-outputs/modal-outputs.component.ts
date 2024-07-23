import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalContent } from '../../../../../../shared/models/modal-content';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-outputs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-outputs.component.html',
})
export class ModalOutputsComponent implements ModalContent {
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;
}
