export interface OutputDetailListener{
  close : () => void;
  submit : () => void;
  cancel : () => void;
}
