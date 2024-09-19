import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../shared/models/modal-content';
import { ActionModalListener } from '../../../../shared/interfaces/ActionModalListener';
import { DynamicForm } from '../../../../shared/types/dynamic.types';

@Component({
  selector: 'app-modal-rols',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-rols.component.html',
})
export class ModalRolsComponent implements ModalContent {
  @Input() forms: DynamicForm[] | null = null;
  @Input() data: any;
  actionsModal?: ActionModalListener | undefined;
  onCreateModal?: EventEmitter<any> | undefined;

 }
