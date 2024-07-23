import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OutputsHeaderComponent } from '../../../components/warehouses/outputs/outputs-header/outputs-header.component';
import { ModalService } from '../../../../../shared/services/Modal.service';
import { ModalOutputsComponent } from '../../../components/warehouses/outputs/modal-outputs/modal-outputs.component';

@Component({
  selector: 'app-outputs',
  standalone: true,
  imports: [
    CommonModule,
    OutputsHeaderComponent,
  ],
  providers : [ModalService],
  templateUrl : './outputs.component.html',

})
export class OutputsComponent {


  private modalService = inject(ModalService);


  onAddEvent() {
    this.modalService.open(ModalOutputsComponent, {
      title: 'Agregar nueva Salida',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }

 }
