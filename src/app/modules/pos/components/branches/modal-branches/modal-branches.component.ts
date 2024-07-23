import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalContent } from '../../../../../shared/models/modal-content';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-branches',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-branches.component.html',

})
export class ModalBranchesComponent implements ModalContent{
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;
}
