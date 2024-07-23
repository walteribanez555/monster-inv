import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalContent } from '../../../../../shared/models/modal-content';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-rols',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-rols.component.html',
})
export class ModalRolsComponent implements ModalContent {
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;
 }
