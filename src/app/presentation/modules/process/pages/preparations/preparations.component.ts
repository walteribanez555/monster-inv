import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { RecipesHeaderComponent } from '../../components/recipes/recipes-header/recipes-header.component';
import { ListRecipesComponent } from '../../components/recipes/list-recipes/list-recipes.component';
import { PreparationHeaderComponent } from '../../components/preparation/preparation-header/preparation-header.component';
import { ListPreparationComponent } from '../../components/preparation/list-preparation/list-preparation.component';
import { ProductFacadeService } from '../../../../../application/facade/inventory/ProductFacade.service';
import { ProductEntity } from '../../../../../domain/entities/inventory/product.entity';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { ProductTypeFacadeService } from '../../../../../application/facade/inventory/ProductTypeFacade.service';
import { WarehouseFacadeService } from '../../../../../application/facade/inventory/WarehouseFacade.service';
import { PreparationFacadeService } from '../../../../../application/facade/process/PreparationFacade.service';
import { DialogService } from '../../../shared/services/Dialog.service';
import { StatusAction } from '../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../shared/enum/dialog';
import { Dialog } from '../../../shared/models/dialog';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { WarehouseEntity } from '../../../../../domain/entities/inventory/warehouse.entity';
import { ProductTypeEntity } from '../../../../../domain/entities/inventory/product-type.entity';
import { ListWarehousesComponent } from '../../components/preparation/list-warehouses/list-warehouses.component';
import { ListTypeProductsComponent } from '../../components/shared/list-type-products/list-type-products.component';
import { ListProductsComponent } from '../../components/shared/list-products/list-products.component';
import { PreparationEntity } from '../../../../../domain/entities/process/preparation.entity';

@Component({
  selector: 'app-preparation',
  standalone: true,
  imports: [
    CommonModule,
    RecipesHeaderComponent,
    ListRecipesComponent,
    PreparationHeaderComponent,
    ListPreparationComponent,
    ListWarehousesComponent,
    ListTypeProductsComponent,
    ListProductsComponent
],
  templateUrl: './preparations.component.html',
})
export class PreparationsComponent implements OnInit {
  private productTypeFacadeService = inject(ProductTypeFacadeService);
  private warehouseFacadeService = inject(WarehouseFacadeService);
  private productFacadeService = inject(ProductFacadeService);
  private preparationFacadeService = inject(PreparationFacadeService);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  onLoading$ = this.preparationFacadeService.status;
  private dialogNotifier = new Subject();

  onShowItem: boolean = false;
  productsList: Signal<ProductEntity[]> = this.productFacadeService.products;

  preparations : Signal<PreparationEntity[]> = this.preparationFacadeService.preparations;

  products: Signal<ProductTypeEntity[]> =
    this.productTypeFacadeService.productTypes;
  warehouses: Signal<WarehouseEntity[]> =
    this.warehouseFacadeService.warehouses;
  listProducts: ItemList[] = this.productsList().map((product) => {
    const productItem = this.products().find(
      (p) => p.product_type_id == product.product_type_id
    );

    return {
      id: product.product_type_id,
      name: productItem ? productItem.name : 'Item',
    };
  });

  constructor() {
    effect(() => {
      this.listProducts = this.products().map((product) => {
        return {
          id: product.product_type_id,
          name: product.name,
        };
      });

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
  ngOnInit(): void {}

  onFilterByWarehouse(params: { [key: string]: any }) {
    this.warehouseSelected = params['warehouse_id'];

    this.localParams = {
      ...this.localParams,
      ...params,
    };
    this.onFilterItems();
  }

  onTypeProductSeleted(type: ItemList) {
    this.localParams = {
      ...this.localParams,
      type: type.id,
    };
    this.onFilterItems();
  }

  onDatesSelected(params: { [key: string]: any }) {
    this.localParams = {
      ...this.localParams,
      ...params,
    };

    this.onFilterItems();
  }

  localParams: any;

  private warehouseSelected?: number;

  itemsListStates: ItemList[] = [
    {
      id: 1,
      name: 'Interno',
    },
    {
      id: 2,
      name: 'Venta',
    },
    {
      id: 3,
      name: 'Elaborado',
    },
    {
      id: 4,
      name: 'Semi Elaborado',
    },
  ];

  onFilterItems() {
    this.preparationFacadeService.getAll(this.localParams, {
      onResult: (result) => {
        console.log(result);
      },
      onError : ( err) => {
        console.log(err);
      }
    })
  }
}
