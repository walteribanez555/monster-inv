import { createPropertySelectors, createSelector } from "@ngxs/store";
import { ProviderState, ProviderStateModel } from "./provider.state";


export class ProviderSelectors{

  static getSlices = createPropertySelectors<ProviderStateModel>(ProviderState);


  static getProviders = createSelector(
    [ProviderSelectors.getSlices.providers],
    (providers) => providers
  )

  getProvider = createSelector(
    [ProviderSelectors.getSlices.providerById],
    (providerById) => providerById
  )


  static getStatus = createSelector(
    [ProviderSelectors.getSlices.status],
    (status) => status
  )


}
