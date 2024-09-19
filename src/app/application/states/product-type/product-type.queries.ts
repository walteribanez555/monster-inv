import { createPropertySelectors, createSelector } from "@ngxs/store";
import { ProductTypeState, ProductTypeStateModel } from "./product-type.state";

export class ProducTypeSelectors {

  static getSlices = createPropertySelectors<ProductTypeStateModel>(ProductTypeState);


  static getProductTypes = createSelector(
    [ProducTypeSelectors.getSlices.productTypes],
    (productTypes) => productTypes
  )

  static getProductType = createSelector(
    [ProducTypeSelectors.getSlices.productTypeById],
    (productTypeById) => productTypeById
  )

  static getStatus = createSelector(
    [ProducTypeSelectors.getSlices.status],
    (status) => status
  )


}
