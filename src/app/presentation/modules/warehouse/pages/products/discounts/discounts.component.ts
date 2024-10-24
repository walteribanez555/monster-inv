import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DiscountsHeaderComponent } from '../../../components/products/discounts/discounts-header/discounts-header.component';
import { ModalDiscountsComponent } from '../../../components/products/discounts/modal-discounts/modal-discounts.component';
import { ActionType } from '../../../../shared/enum/action';
import { ModalService } from '../../../../shared/services/Modal.service';

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [
    CommonModule,
    DiscountsHeaderComponent,
  ],
  templateUrl : './discounts.component.html',

})
export class DiscountsComponent {

  private modalService = inject(ModalService);


  onAddEvent() {
    console.log({'onAddEvent': 'onAddEvent'});
    this.modalService.open(ModalDiscountsComponent, {
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
