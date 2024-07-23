import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InputsHeaderComponent } from '../../../components/warehouses/inputs/inputs-header/inputs-header.component';
import { ModalService } from '../../../../../shared/services/Modal.service';
import { ModalInputsComponent } from '../../../components/warehouses/inputs/modal-inputs/modal-inputs.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
    InputsHeaderComponent,
  ],
  templateUrl : './inputs.component.html',

})
export class InputsComponent {
  private modalService = inject(ModalService);

  onAddEvent() {
    this.modalService.open(ModalInputsComponent, {
      title: 'Agregar nueva entrada',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }


 }
