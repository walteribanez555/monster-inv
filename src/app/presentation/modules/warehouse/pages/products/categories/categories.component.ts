import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoriesHeaderComponent } from '../../../components/products/categories/categories-header/categories-header.component';
import { ModalCategoriesComponent } from '../../../components/products/categories/modal-categories/modal-categories.component';
import { ListCategoriesComponent } from '../../../components/products/categories/list-categories/list-categories.component';
import { CategoryService } from '../../../../../core/services/api/inventory/category.service';
import { Category } from '../../../models/categories/Category';
import { ActionType } from '../../../../shared/enum/action';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { ModalService } from '../../../../shared/services/Modal.service';
import { CategoryDetailComponent } from '../../../components/products/categories/category-detail/category-detail.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CategoriesHeaderComponent,
    ListCategoriesComponent,
    DcDirective,
  ],
  templateUrl : './categories.component.html',

})
export class CategoriesComponent implements OnInit {


  @ViewChild(DcDirective) dcWrapper! : DcDirective;


  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next:  ( resp ) => {
        this.categories = resp;
      },
      error : ( err ) => {

      },
      complete : ( ) => {

      }
    })

  }

  private modalService = inject(ModalService);
  private categoryService = inject(CategoryService);



  categories : Category[] = [];



  onShowItem = false;


  onAddEvent() {
    console.log({'onAddEvent': 'onAddEvent'});
    this.modalService.open(ModalCategoriesComponent, {
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



  onSelectItem( category : Category) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory = viewContainerRef.createComponent(CategoryDetailComponent);
    // componentFactory.instance.category = category;
    this.onShowItem = true;
  }


 }
