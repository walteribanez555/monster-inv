import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../shared/models/modal-content';
import { ActionModalListener } from '../../../../shared/interfaces/ActionModalListener';
import { DynamicForm } from '../../../../shared/types/dynamic.types';

@Component({
  selector: 'app-modal-branches',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-branches.component.html',

})
export class ModalBranchesComponent implements ModalContent{
  @Input() forms: DynamicForm[] | null = null;
  actionsModal?: ActionModalListener | undefined;
  onCreateModal?: EventEmitter<any> | undefined;
  @Input() data!: any;
}
