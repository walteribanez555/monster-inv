import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersHeaderComponent } from '../../components/users/users-header/users-header.component';
import { ModalUsersComponent } from '../../components/users/modal-users/modal-users.component';
import { ActionType } from '../../../shared/enum/action';
import { ModalService } from '../../../shared/services/Modal.service';

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
      title: `Ingresar tus api keys`,
          size: 'sm',
          forms: null,
          data: {},
          icon: 'assets/icons/heroicons/outline/plus.svg',
          actions: [
            {
              action: ActionType.Create,
              title: 'Ingresar',
            },
          ],
    });
  }
}
