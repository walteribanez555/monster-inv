import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductsHeaderComponent } from '../../../components/products/products/products-header/products-header.component';
import { ModalProductsComponent } from '../../../components/products/products/modal-products/modal-products.component';
import { ListProductsComponent } from '../../../components/products/products/list-products/list-products.component';
import { ActionType } from '../../../../shared/enum/action';
import { ModalService } from '../../../../shared/services/Modal.service';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { DetailProductComponent } from '../../../components/products/products/detail-product/detail-product.component';
import { ProductTypeFacadeService } from '../../../../../../application/facade/ProductTypeFacade.service';
import { Subject, timer } from 'rxjs';
import { StatusAction } from '../../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../../shared/enum/dialog';
import { Dialog } from '../../../../shared/models/dialog';
import { DialogService } from '../../../../shared/services/Dialog.service';
import { ProductTypeEntity } from '../../../../../../domain/entities/inventory/product-type.entity';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';
import { DynamicForm } from '../../../../shared/types/dynamic.types';
import { FormTemplateComponent } from '../../../../shared/components/form-template/form-template.component';
import { InputTextComponent } from '../../../../shared/components/form-inputs/input-text/input-text.component';
import { FormControl } from '@angular/forms';
import { responseModalFormMapper } from '../../../../shared/utils/mappers/response-modal-form/response-modal-form';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductsHeaderComponent,
    ListProductsComponent,
    DcDirective,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  onShowItem = false;
  private dialogNotifier = new Subject();
  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  private productTypeFacadeService = inject(ProductTypeFacadeService);
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);

  constructor() {
    effect(() => {
      switch (this.onLoading$()) {
        case StatusAction.LOADING:
          const dialog: Dialog = {
            typeDialog: DialogType.isLoading,
            listener: this.dialogNotifier,
            data: {
              title: 'Cargando',
              description: 'Espere un momento por favor',
              icon: 'assets/icons/loading.svg',
            },
            options: {
              withActions: false,
              withBackground: true,
              position: [DialogPosition.center],
              colorIcon: 'text-primary',
            },
          };

          this.dialogService.open(dialog);
          break;
        case StatusAction.SUCCESS:
          this.dialogNotifier.next(null);
          //Show Success dialog
          const dialogSuccess: Dialog = {
            typeDialog: DialogType.isSuccess,
            data: {
              title: 'Operacion Exitosa',
              description: 'La operacion se ha completado con exito',
              icon: 'assets/icons/heroicons/outline/check-badge.svg',
            },
            options: {
              withBackground: false,
              position: [DialogPosition.top, DialogPosition.right],
              colorIcon: 'text-green-500',
              timeToShow: timer(2000),
            },
          };

          this.dialogService.open(dialogSuccess);

          break;

        case StatusAction.INITIAL:
          this.dialogNotifier.next(null);
          break;

        default:
          this.dialogNotifier.next(null);
      }
    });
  }

  productTypes$ = this.productTypeFacadeService.productTypes;
  onLoading$ = this.productTypeFacadeService.statusAction;

  ngOnInit(): void {
  }

  onAddEvent() {

    const productTypeForm : DynamicForm = {
      component : FormTemplateComponent,
      data : {
        title : 'Detalles del nuevo tipo de producto a agregar',
        description : 'Especificaciones necesarias del tipo de producto a agregar',
      },
      dynamicFields : [
        {
          component : InputTextComponent,
          data: {
            placeholder : 'Tipo de producto 1',
            title : 'Tipo de producto',
          },
          fieldFormControl : new FormControl(''),
        }
      ]
    }

    this.modalService.open(ModalProductsComponent, {
      title: `Agrega un nuevo tipo de producto`,
      size: 'sm',
      forms: [productTypeForm],
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Ingresar',
        },
      ],
    }).subscribe({
      next: (resp) => {
        const formResponse = responseModalFormMapper(resp);
        const productTypeName = formResponse['Tipo de producto'];
        this.productTypeFacadeService.addItem(productTypeName, "1", "0", 1);
      }
    })
  }

  detailListener: DetailListener<ProductTypeEntity> = {
    close: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    cancel: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    delete: (id) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      const dialog: Dialog = {
        typeDialog: DialogType.isAlert,
        data: {
          title: 'Advertencia',
          description: 'Estas seguro de realizar esta accion',
          icon: 'assets/icons/heroicons/outline/exclamation.svg',
        },
        options: {
          withActions: true,
          position: [DialogPosition.center],
          withBackground: true,
          colorIcon: 'text-red-500',
        },
      };

      this.dialogService.open(dialog).subscribe((resp) => {
        this.productTypeFacadeService.deleteItem(id as number);
      });
    },
    submit: (form) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      const dialog = {
        typeDialog: DialogType.isAlert,
        data: {
          title: 'Advertencia',
          description: 'Estas seguro de realizar esta accion',
          icon: 'assets/icons/heroicons/outline/exclamation.svg',
        },
        options: {
          withActions: true,
          position: [DialogPosition.center],
          withBackground: true,
          colorIcon: 'text-red-500',
        },
      };

      this.dialogService.open(dialog).subscribe((resp) => {
        const { product_type_id, name, status, categories, type } = form.value;

        this.productTypeFacadeService.updateItem(
          product_type_id,
          name,
          status,
          categories,
          type
        );
      });
    },
  };

  onViewItem(productTypeEntity: ProductTypeEntity) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      DetailProductComponent
    );
    componentFactory.instance.detailListener = this.detailListener;

    componentFactory.instance.productType = productTypeEntity;

    this.onShowItem = true;
  }
}
