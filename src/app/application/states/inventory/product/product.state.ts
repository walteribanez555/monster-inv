import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProductActions } from './product.actions';
import { ProductEntity } from '../../../../domain/entities/inventory/product.entity';
import { StatusAction } from '../../../enums/Status.enum';
import { GetProductService } from '../../../../domain/use-cases/inventory/products/get-product.service';
import { GetProductsService } from '../../../../domain/use-cases/inventory/products/get-products.service';
import { DeleteProductService } from '../../../../domain/use-cases/inventory/products/delete-product.service';
import { timer } from 'rxjs';

export interface ProductStateModel {
  products: ProductEntity[];
  productById: ProductEntity | null;
  status: StatusAction;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
    productById: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class ProductState {
  private readonly getProductUseCase = inject(GetProductService);
  private readonly getProductsUseCase = inject(GetProductsService);
  private readonly deleteProductUseCase = inject(DeleteProductService);

  @Action(ProductActions.Get)
  async get(ctx: StateContext<ProductStateModel>, action: ProductActions.Get) {
    ctx.patchState({ status: StatusAction.LOADING });
    const product = await this.getProductUseCase.execute(action.product_id);
    ctx.patchState({
      status: StatusAction.SUCCESS,
      productById: product,
    });
    this.setInitialState(ctx);
  }

  @Action(ProductActions.GetAll)
  async getAll(ctx: StateContext<ProductStateModel>, action: ProductActions.GetAll) {
    ctx.patchState({ status: StatusAction.LOADING });
    const products = await this.getProductsUseCase.execute(action.params);
    ctx.patchState({ products, status: StatusAction.INITIAL });
  }

  @Action(ProductActions.Delete)
  async delete(
    ctx: StateContext<ProductStateModel>,
    action: ProductActions.Delete
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    await this.deleteProductUseCase.execute(action.product_id);

    ctx.patchState({
      status: StatusAction.SUCCESS,
      products: ctx
        .getState()
        .products.filter((product) => product.product_id !== action.product_id),
    });
    this.setInitialState(ctx);
  }

  setInitialState(ctx: StateContext<ProductStateModel>) {
    timer(2000).subscribe(() => {
      ctx.patchState({ status: StatusAction.INITIAL });
    });
  }
}
