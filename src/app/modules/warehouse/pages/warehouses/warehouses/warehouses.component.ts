import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { WarehousesHeaderComponent } from "../../../components/warehouses/warehouses/warehouses-header/warehouses-header.component";
import { ModalService } from '../../../../../shared/services/Modal.service';
import { ModalWarehousesComponent } from '../../../components/warehouses/warehouses/modal-warehouses/modal-warehouses.component';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    CommonModule,
    WarehousesHeaderComponent
],
  templateUrl : './warehouses.component.html',

})
export class WarehousesComponent {

  private modalService = inject(ModalService);


  onAddEvent() {
    this.modalService.open(ModalWarehousesComponent, {
      title: 'Agregar nuevo almacen',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }


 }
