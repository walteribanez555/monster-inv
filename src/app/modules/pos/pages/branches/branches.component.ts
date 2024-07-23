import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BranchesHeaderComponent } from '../../components/branches/branches-header/branches-header.component';
import { ModalService } from '../../../../shared/services/Modal.service';
import { ModalBranchesComponent } from '../../components/branches/modal-branches/modal-branches.component';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, BranchesHeaderComponent],
  templateUrl: './branches.component.html',
})
export class BranchesComponent {

  private modalService = inject(ModalService);

  onAddEvent(){
    this.modalService.open(ModalBranchesComponent, {
      title: 'Agregar nueva sucursal',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }

}
