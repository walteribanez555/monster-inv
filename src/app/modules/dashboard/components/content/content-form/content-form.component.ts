import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalContent } from '../../../../../shared/models/modal-content';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl : './content-form.component.html',

})
export class ContentFormComponent implements ModalContent {
   @Input() form!: FormGroup<any>;
   data : any= null;
}
