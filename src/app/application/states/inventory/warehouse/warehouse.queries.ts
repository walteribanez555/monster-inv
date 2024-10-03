import { createPropertySelectors, createSelector } from "@ngxs/store";
import { WarehouseState, WarehouseStateModel } from "./warehouse.state";

export class WarehouseSelectors{
  static getSlices = createPropertySelectors<WarehouseStateModel>(WarehouseState);


  static getWarehouses = createSelector(
    [WarehouseSelectors.getSlices.warehouses],
    (warehouses) => warehouses
  )

  static getWarehouse = createSelector(
    [WarehouseSelectors.getSlices.warehouseById],
    (warehouseById) => warehouseById
  )

  static getStatus = createSelector(
    [WarehouseSelectors.getSlices.status],
    (status) => status
  )


}
