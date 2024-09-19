export interface ActionCompletion<T = any> {
  action : T,
  result : {
    successfull : boolean,
    canceled: boolean,
    error? :Error
  }
}
