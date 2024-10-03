import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { RolActions } from '../../states/identity/rol/rol.actions';
import { CreateRolDto } from '../../../domain/dtos/identity/rol/create-rol.dto';
import { UpdateRolDto } from '../../../domain/dtos/identity/rol/update-rol.dto';
import { RolEntity } from '../../../domain/entities/identity/rol.entity';
import { RolSelectors } from '../../states/identity/rol/rol.queries';
import { StatusAction } from '../../enums/Status.enum';

@Injectable({
  providedIn: 'root'
})
export class RolFacadeService {

  private _store = inject(Store);

  rols : Signal<RolEntity[]> = this._store.selectSignal(RolSelectors.getSlices.rols);

  rolById : Signal<RolEntity | null> = this._store.selectSignal(RolSelectors.getRol);

  status : Signal<StatusAction> = this._store.selectSignal(RolSelectors.getStatus);


  constructor() {
    this._store.dispatch(new RolActions.GetAll({}));
  }

  public getAll( paramas : {[key:string] : any}){
    this._store.dispatch(new RolActions.GetAll(paramas));

  }

  public getOne( id : number){
    this._store.dispatch(new RolActions.Get(id));
  }


  public create( dto : CreateRolDto) {
    this._store.dispatch(new RolActions.Create(dto));
  }



  public update( dto : UpdateRolDto) {
    this._store.dispatch(new RolActions.Update(dto));
  }

  public delete( id : number) {
    this._store.dispatch(new RolActions.Delete(id));
  }


}
