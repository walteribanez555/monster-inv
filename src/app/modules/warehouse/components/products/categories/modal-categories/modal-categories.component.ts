import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalContent } from '../../../../../../shared/models/modal-content';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-categories',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-categories.component.html',
})
export class ModalCategoriesComponent implements ModalContent {
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;

  @Output() addEvent = new EventEmitter();



  onAddToggle(){
    this.addEvent.emit();
  }
}
