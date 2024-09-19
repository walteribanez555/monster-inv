import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../shared/models/modal-content';
import { ActionModalListener } from '../../../../shared/interfaces/ActionModalListener';
import { DynamicForm } from '../../../../shared/types/dynamic.types';

@Component({
  selector: 'app-modal-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-users.component.html',
})
export class ModalUsersComponent implements ModalContent {
  forms: DynamicForm[] | null = null;
  actionsModal?: ActionModalListener | undefined;
  onCreateModal?: EventEmitter<any> | undefined;
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;
}
