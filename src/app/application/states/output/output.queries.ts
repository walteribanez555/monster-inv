import { createPropertySelectors, createSelector } from "@ngxs/store";
import { OutputState, OutputStateModel } from "./output.state";

export class OutputSelectors{


  static getSlices = createPropertySelectors<OutputStateModel>(OutputState);

  static getOutputs = createSelector(
    [OutputSelectors.getSlices.outputs],
    (outputs) => outputs
  )

  static getOutput = createSelector(
    [OutputSelectors.getSlices.outputById],
    (outputById) => outputById
  )

  static getStatus = createSelector(
    [OutputSelectors.getSlices.status],
    (status) => status
  )
}
