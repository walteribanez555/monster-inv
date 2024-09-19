import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { StatusAction } from '../enums/Status.enum';
import { ProducTypeSelectors } from '../states/product-type/product-type.queries';
import { ProductTypeEntity } from '../../domain/entities/inventory/product-type.entity';
import { ProductTypeActions } from '../states/product-type/product-type.actions';
import { CreateProductTypeDto } from '../../domain/dtos/inventory/product-types/create-product-type';
import { UpdateProductTypeDto } from '../../domain/dtos/inventory/product-types/update-product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeFacadeService {

  private _store = inject(Store);


  statusAction : Signal<StatusAction> = this._store.selectSignal(
    ProducTypeSelectors.getStatus
  );

  productTypes: Signal<ProductTypeEntity[]> = this._store.selectSignal(
    ProducTypeSelectors.getProductTypes
  );

  constructor() {
    this._store.dispatch(new ProductTypeActions.GetAll());
  }


  addItem(
    name : string,
    status : string,
    categories : string,
    type : number,
  ) {

    const [err, dto ] = CreateProductTypeDto.create({
      name,
      status,
      categories,
      type
    });

    if(err) {
      console.log(err);
      return;
    }

    this._store.dispatch(new ProductTypeActions.Create(dto as CreateProductTypeDto));

  }

  updateItem(
    productTypeId: number,
    name : string,
    status : string,
    categories : string,
    type : number,
  ) {

    const [err, dto ] = UpdateProductTypeDto.create({
      product_type_id: productTypeId,
      name,
      status,
      categories,
      type
    });


    if(err) {
      console.log(err);
      return;
    }

    this._store.dispatch(new ProductTypeActions.Update(dto as UpdateProductTypeDto));
  }

  deleteItem( productTypeId: number) {
    this._store.dispatch(new ProductTypeActions.Delete(productTypeId));
  }

  getItem(productTypeId: number) {
    this._store.dispatch(new ProductTypeActions.Get(productTypeId));
  }

  getAllItems() {
    this._store.dispatch(new ProductTypeActions.GetAll());
  }


}
