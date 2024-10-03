export interface StateCallback<T> {
  onResult : (result : T) => void;
  onError : (error : any) => void;

}
