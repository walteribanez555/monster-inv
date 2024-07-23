import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RolsHeaderComponent } from '../../components/rols/rols-header/rols-header.component';
import { ModalRolsComponent } from '../../components/rols/modal-rols/modal-rols.component';
import { ModalService } from '../../../../shared/services/Modal.service';

@Component({
  selector: 'app-rols',
  standalone: true,
  imports: [
    CommonModule,
    RolsHeaderComponent,
  ],
  templateUrl : './rols.component.html',
})
export class RolsComponent {
  private modalService = inject(ModalService);

  onAddEvent() {
    this.modalService.open(ModalRolsComponent, {
      title: 'Agregar nuevo Rol',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }


 }
