import { createPropertySelectors, createSelector } from "@ngxs/store";
import { InputState, InputStateModel } from "./input.state";

export class InputSelectors {

  static getSlices = createPropertySelectors<InputStateModel>(InputState);


  static getInputs = createSelector(
    [InputSelectors.getSlices.inputs],
    (inputs) => inputs
  )

  static getInput = createSelector(
    [InputSelectors.getSlices.inputById],
    (inputById) => inputById
  )


  static getStatus = createSelector(
    [InputSelectors.getSlices.status],
    (status) => status
  )




}
