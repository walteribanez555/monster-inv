import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../../shared/models/modal-content';
import { ActionModalListener } from '../../../../../shared/interfaces/ActionModalListener';
import { DynamicForm } from '../../../../../shared/types/dynamic.types';

@Component({
  selector: 'app-modal-categories',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-categories.component.html',
})
export class ModalCategoriesComponent implements ModalContent {
  forms: DynamicForm[] | null = null;
  actionsModal?: ActionModalListener | undefined;
  onCreateModal?: EventEmitter<any> | undefined;
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;

  @Output() addEvent = new EventEmitter();



  onAddToggle(){
    this.addEvent.emit();
  }
}
