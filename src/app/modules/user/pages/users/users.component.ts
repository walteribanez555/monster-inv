import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersHeaderComponent } from '../../components/users/users-header/users-header.component';
import { ModalService } from '../../../../shared/services/Modal.service';
import { ModalUsersComponent } from '../../components/users/modal-users/modal-users.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UsersHeaderComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private modalService = inject(ModalService);

  onAddEvent() {
    this.modalService.open(ModalUsersComponent, {
      title: 'Agregar nuevo Usuario',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }
}
