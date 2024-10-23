import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthComponent } from '../../../auth/auth.component';
import { FormPreparationComponent } from '../../components/preparation/form-preparation/form-preparation.component';
import { ListProductsComponent } from '../../components/shared/list-products/list-products.component';
import { ProductFacadeService } from '../../../../../application/facade/inventory/ProductFacade.service';
import { ProductEntity } from '../../../../../domain/entities/inventory/product.entity';
import { ProductTypeFacadeService } from '../../../../../application/facade/inventory/ProductTypeFacade.service';
import { ProductTypeEntity } from '../../../../../domain/entities/inventory/product-type.entity';
import { ProcessListRecipesComponent } from '../../components/shared/process-list-recipes/process-list-recipes.component';
import { ItemQuantity } from '../../../shared/components/custom-inputs/list-quantity/interfaces/item-quantity.interface';
import { ListQuantityInterface } from '../../../shared/components/custom-inputs/list-quantity/interfaces/list-quantity.interface';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { FormRecipesComponent } from '../../components/recipes/form-recipes/form-recipes.component';
import { ListWarehousesComponent } from '../../components/preparation/list-warehouses/list-warehouses.component';
import { WarehouseFacadeService } from '../../../../../application/facade/inventory/WarehouseFacade.service';
import { WarehouseEntity } from '../../../../../domain/entities/inventory/warehouse.entity';
import { PreparationFacadeService } from '../../../../../application/facade/process/PreparationFacade.service';
import { CreatePreparationDTO } from '../../../../../domain/dtos/process/preparations/create-preparation.dto';

@Component({
  selector: 'app-preparation',
  standalone: true,
  imports: [
    CommonModule,
    ListProductsComponent,
    AuthComponent,
    FormPreparationComponent,
    ProcessListRecipesComponent,
    FormRecipesComponent,
    ListWarehousesComponent,
  ],
  templateUrl: './preparation.component.html',
})
export class PreparationComponent implements OnInit {
  ngOnInit(): void {
    const params = this.activatedRouter.snapshot.params;
  }

  constructor() {
    effect(() => {
      this.listProducts = this.products().map((product) => {
        return {
          id: product.product_type_id,
          name: product.name,
        };
      });
    });
  }

  interfaceListQuantities?: ListQuantityInterface<ItemQuantity>;

  onSelectItem(i: ProductEntity) {
    const productItem = this.products().find(
      (p) => p.product_type_id == i.product_type_id
    );

    const itemMapped: ItemQuantity = {
      id: i.product_type_id,
      name: productItem ? productItem.name : 'Item',
      value: i.quantity,
    };
    this.interfaceListQuantities?.onAddItem(itemMapped);
  }

  private activatedRouter = inject(ActivatedRoute);

  private warehouseSelected?: number;

  private productTypeFacadeService = inject(ProductTypeFacadeService);
  private warehouseFacadeService = inject(WarehouseFacadeService);
  private productFacadeService = inject(ProductFacadeService);
  private preparationFacadeService = inject(PreparationFacadeService);

  products: Signal<ProductTypeEntity[]> =
    this.productTypeFacadeService.productTypes;
  warehouses: Signal<WarehouseEntity[]> =
    this.warehouseFacadeService.warehouses;
  productsList: Signal<ProductEntity[]> = this.productFacadeService.products;

  onFilterByWarehouse(params: { [key: string]: any }) {
    this.warehouseSelected = params['warehouse_id'];
    this.productFacadeService.getItems(params);
    this.interfaceListQuantities?.onReset();
  }

  listProducts: ItemList[] = this.productsList().map((product) => {
    const productItem = this.products().find(
      (p) => p.product_type_id == product.product_type_id
    );

    return {
      id: product.product_type_id,
      name: productItem ? productItem.name : 'Item',
    };
  });

  onCreatedInterface(i: ListQuantityInterface<ItemQuantity>) {
    this.interfaceListQuantities = i;
  }

  onCreateRecipe(value: any) {
    // console.log(value);
    // console.log(this.warehouseSelected);

    const responseToDb = {
      ...value,
      items: value.items.map((i: any) => {
        return {
          product_type_id: i.id,
          quantity: i.amount,
        };
      }),
      status: 1,
      warehouse_id: this.warehouseSelected!,
    };


    const [err, dto ] =CreatePreparationDTO.fromObj(responseToDb);

    if(err) {
      console.log(err);
      return;
    }


    console.log(dto);


    this.preparationFacadeService.create((dto as CreatePreparationDTO), {
      onError: (err) => {
        console.log(err);
      },
      onResult: (entity) => {
        console.log(entity);
      },
    });


  }
}
