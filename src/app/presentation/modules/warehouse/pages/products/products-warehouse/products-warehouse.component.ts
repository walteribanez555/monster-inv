import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ProductsHeaderComponent } from '../../../components/products/products/products-header/products-header.component';
import { ListProductsWarehouseComponent } from '../../../components/products/products-warehouse/list-products-warehouse/list-products-warehouse.component';
import { ProductsWarehouseHeaderComponent } from "../../../components/products/products-warehouse/products-warehouse-header/products-warehouse-header.component";
import { ProductFacadeService } from '../../../../../../application/facade/ProductFacade.service';
import { WarehouseFacadeService } from '../../../../../../application/facade/WarehouseFacade.service';
import { Subject, timer } from 'rxjs';
import { StatusAction } from '../../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../../shared/enum/dialog';
import { Dialog } from '../../../../shared/models/dialog';
import { DialogService } from '../../../../shared/services/Dialog.service';

@Component({
  selector: 'app-products-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    ListProductsWarehouseComponent,
    ProductsWarehouseHeaderComponent
],
  templateUrl : './products-warehouse.component.html',
})
export class ProductsWarehouseComponent {
    onShowItem : boolean = false;


    private warehouseFacadeService = inject(WarehouseFacadeService);
    private productFacadeService = inject(ProductFacadeService);


    onLoading$ = this.productFacadeService.statusAction;
    products$ = this.productFacadeService.products;
    warehouses$ = this.warehouseFacadeService.warehouses;

    private dialogService = inject(DialogService);
    private dialogNotifier = new Subject();

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

    onFilterEvents( params : {[key:string] : any}){
      this.productFacadeService.getItems(params);
    }




 }
