import { createPropertySelectors, createSelector } from "@ngxs/store";
import { RolState, RolStateModel } from "./rol.state";

export class RolSelectors {

  static getSlices = createPropertySelectors<RolStateModel>(RolState);

  static getRols = createSelector(
    [RolSelectors.getSlices.rols],
    (rols) => rols
  )

  static getRol = createSelector(
    [RolSelectors.getSlices.rolById],
    (rolById) => rolById
  )


  static getStatus = createSelector(
    [RolSelectors.getSlices.status],
    (status) => status
  )
}
