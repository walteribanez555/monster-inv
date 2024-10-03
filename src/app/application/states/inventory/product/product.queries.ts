import { createPropertySelectors, createSelector } from "@ngxs/store";
import { ProductState, ProductStateModel } from "./product.state";


export class ProductSelectors {

  static getSlices = createPropertySelectors<ProductStateModel> ( ProductState);

  static getProducts = createSelector(
    [ProductSelectors.getSlices.products],
    (products) => products
  )

  static getProduct = createSelector(
    [ProductSelectors.getSlices.productById],
    (productById) => productById
  )

  static getStatus = createSelector(
    [ProductSelectors.getSlices.status],
    (status) => status
  )



}
