import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductEntity } from '../../../domain/entities/inventory/product.entity';
import { StatusAction } from '../../enums/Status.enum';
import { ProductActions } from '../../states/inventory/product/product.actions';
import { ProductSelectors } from '../../states/inventory/product/product.queries';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {


  private _store = inject(Store);


  statusAction : Signal<StatusAction> = this._store.selectSignal(
    ProductSelectors.getStatus
  );

  products: Signal<ProductEntity[]> = this._store.selectSignal(
    ProductSelectors.getProducts
  );

  product: Signal<ProductEntity | null> = this._store.selectSignal(
    ProductSelectors.getProduct
  );

  constructor() {
    this._store.dispatch(new ProductActions.GetAll({}));
  }

  getItem( id : number) {
    this._store.dispatch(new ProductActions.Get(id));
  }


  getItems(params : {[key:string] : any}) {
    this._store.dispatch(new ProductActions.GetAll(params));
  }

}
