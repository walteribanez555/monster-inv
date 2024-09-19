import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProductTypeActions } from './product-type.actions';
import { ProductTypeEntity } from '../../../domain/entities/inventory/product-type.entity';
import { StatusAction } from '../../enums/Status.enum';
import { CreateProductTypeService } from '../../../domain/use-cases/inventory/product-type/create-product-type.service';
import { UpdateProductTypeService } from '../../../domain/use-cases/inventory/product-type/update-product-type.service';
import { DeleteProductTypesService } from '../../../domain/use-cases/inventory/product-type/delete-product-types.service';
import { GetProductTypeService } from '../../../domain/use-cases/inventory/product-type/get-product-type.service';
import { GetProductTypesService } from '../../../domain/use-cases/inventory/product-type/get-product-types.service';
import { timer } from 'rxjs';

export interface ProductTypeStateModel {
  productTypes: ProductTypeEntity[];
  productTypeById: ProductTypeEntity | null;
  status: StatusAction;
}

@State<ProductTypeStateModel>({
  name: 'productType',
  defaults: {
    productTypes: [],
    productTypeById: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class ProductTypeState {
  private readonly createProductTypeUseCase = inject(CreateProductTypeService);
  private readonly updateProductTypeUseCase = inject(UpdateProductTypeService);
  private readonly deleteProducTypeUseCase = inject(DeleteProductTypesService);
  private readonly getProductTypeUseCase = inject(GetProductTypeService);
  private readonly getProductTypesUseCase = inject(GetProductTypesService);

  @Action(ProductTypeActions.Get)
  async get(
    ctx: StateContext<ProductTypeStateModel>,
    action: ProductTypeActions.Get
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const productType = await this.getProductTypeUseCase.execute(
      action.product_type_id
    );
    ctx.patchState({
      status: StatusAction.SUCCESS,
      productTypeById: productType[0] ? productType[0] : null,
    });
    this.setInitialState(ctx);
  }

  @Action(ProductTypeActions.GetAll)
  async getAll(ctx: StateContext<ProductTypeStateModel>) {
    ctx.patchState({ status: StatusAction.LOADING });
    const productTypes = await this.getProductTypesUseCase.execute();
    ctx.patchState({ productTypes, status: StatusAction.INITIAL });
  }

  @Action(ProductTypeActions.Create)
  async create(
    ctx: StateContext<ProductTypeStateModel>,
    action: ProductTypeActions.Create
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const productType = await this.createProductTypeUseCase.execute(action.dto);
    ctx.patchState({
      status: StatusAction.SUCCESS,
      productTypes: [...ctx.getState().productTypes, productType],
    });
    this.setInitialState(ctx);
  }

  @Action(ProductTypeActions.Update)
  async update(
    ctx: StateContext<ProductTypeStateModel>,
    action: ProductTypeActions.Update
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const productType = await this.updateProductTypeUseCase.execute(action.dto);
    ctx.patchState({
      status: StatusAction.SUCCESS,
      productTypes: ctx
        .getState()
        .productTypes.map((p) =>
          p.product_type_id === action.dto.product_type_id ? productType : p
        ),
    });
    this.setInitialState(ctx);
  }


  @Action(ProductTypeActions.Delete)
  async delete(
    ctx : StateContext<ProductTypeStateModel>,
    action : ProductTypeActions.Delete
  ){
    ctx.patchState({ status : StatusAction.LOADING });
    await this.deleteProducTypeUseCase.execute(action.product_type_id);
    ctx.patchState({
      status : StatusAction.SUCCESS,
      productTypes : ctx
        .getState()
        .productTypes.filter((p) => p.product_type_id !== action.product_type_id)
    });
    this.setInitialState(ctx);
  }

  setInitialState(ctx: StateContext<ProductTypeStateModel>) {
    timer(2000).subscribe(() => {
      ctx.patchState({ status: StatusAction.INITIAL });
    });
  }
}
