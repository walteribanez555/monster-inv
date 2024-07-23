import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalContent } from '../../../../../shared/models/modal-content';

@Component({
  selector: 'app-section-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl : './section-form.component.html',

})
export class SectionFormComponent implements ModalContent {
  @Input() form!: FormGroup<any>;



}
