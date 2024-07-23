import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoriesHeaderComponent } from '../../../components/products/categories/categories-header/categories-header.component';
import { ModalCategoriesComponent } from '../../../components/products/categories/modal-categories/modal-categories.component';
import { ModalService } from '../../../../../shared/services/Modal.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CategoriesHeaderComponent,
  ],
  templateUrl : './categories.component.html',

})
export class CategoriesComponent {

  private modalService = inject(ModalService);


  onAddEvent() {
    console.log({'onAddEvent': 'onAddEvent'});
    this.modalService.open(ModalCategoriesComponent, {
      title: 'Agregar nueva Categoria',
      size: 'sm',
      form: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
    });
  }




 }
