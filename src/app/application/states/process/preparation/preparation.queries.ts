import { createPropertySelectors, createSelector, Store } from "@ngxs/store";
import { PreparationState, PreparationStateModel } from "./preparation.state";

export class PreparationSelectors {

  static getSlices = createPropertySelectors<PreparationStateModel>(PreparationState);

  static getPreparations  = createSelector(
    [PreparationSelectors.getSlices.preparations],
    (preparations ) => preparations
  )

  static getPreparationById = createSelector(
    [PreparationSelectors.getSlices.preparatioById],
    (preparation) => preparation
  )


  static getStatus = createSelector(
    [PreparationSelectors.getSlices.status],
    (status ) => status
  )



}
