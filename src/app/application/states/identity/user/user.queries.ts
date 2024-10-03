import { createPropertySelectors, createSelector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";

export class UserSelectors {
  static getSlices=  createPropertySelectors<UserStateModel>(UserState);


  static getUsers = createSelector(
    [UserSelectors.getSlices.users],
    (users) => users
  )

  static getUser = createSelector(
    [UserSelectors.getSlices.userById],
    (userById) => userById
  )

  static getStatus = createSelector(
    [UserSelectors.getSlices.status],
    (status) => status
  )



}
