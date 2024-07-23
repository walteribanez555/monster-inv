import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsHeaderComponent } from '../../../components/products/products/products-header/products-header.component';
import { ModalService } from '../../../../../shared/services/Modal.service';
import { ModalProductsComponent } from '../../../components/products/products/modal-products/modal-products.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductsHeaderComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private modalService = inject(ModalService);

  onAddEvent() {
    console.log({ onAddEvent: 'onAddEvent' });
    this.modalService.open(ModalProductsComponent, {
      title: 'Agregar nuevo Producto',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }
}
