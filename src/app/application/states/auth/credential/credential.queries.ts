import { createModelSelector, createPropertySelectors, createSelector } from "@ngxs/store";
import { CredentialState, CredentialStateModel } from "./credential.state";


export class CredentialSelectors {

  static getSlices = createPropertySelectors<CredentialStateModel>(CredentialState);


  static getCredential = createSelector(
    [CredentialSelectors.getSlices.credential],
    (credential) => credential
  )

  static getStatus = createSelector(
    [CredentialSelectors.getSlices.status],
    (status) => status
  )


}
