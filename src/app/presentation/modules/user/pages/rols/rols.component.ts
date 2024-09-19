import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RolsHeaderComponent } from '../../components/rols/rols-header/rols-header.component';
import { ModalRolsComponent } from '../../components/rols/modal-rols/modal-rols.component';
import { ActionType } from '../../../shared/enum/action';
import { ModalService } from '../../../shared/services/Modal.service';

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
