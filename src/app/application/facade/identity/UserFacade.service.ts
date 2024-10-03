import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserEntity } from '../../../domain/entities/identity/user.entity';
import { UserSelectors } from '../../states/identity/user/user.queries';
import { StatusAction } from '../../enums/Status.enum';
import { UserActions } from '../../states/identity/user/user.actions';
import { CreateUserDto } from '../../../domain/dtos/identity/user/create-user.dto';
import { UpdateUserDto } from '../../../domain/dtos/identity/user/update-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {


  private _store = inject(Store);

  users : Signal<UserEntity[]> = this._store.selectSignal(UserSelectors.getSlices.users);

  userByUsername : Signal<UserEntity | null> = this._store.selectSignal(UserSelectors.getUser);

  status : Signal<StatusAction> = this._store.selectSignal(UserSelectors.getStatus);





  constructor() {
    this._store.dispatch(new UserActions.GetAll({}));
  }


  public getAll( paramas : {[key:string] : any}){
    this._store.dispatch(new UserActions.GetAll(paramas));

  }

  public getOne( username : string){
    this._store.dispatch(new UserActions.Get(username));
  }

  public create ( dto : CreateUserDto) {
    this._store.dispatch(new UserActions.Create(dto));
  }

  public update( dto : UpdateUserDto) {
    this._store.dispatch(new UserActions.Update(dto));
  }

}
