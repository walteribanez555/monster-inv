import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { CredentialActions } from '../../states/auth/credential/credential.actions';
import { CredentialEntity } from '../../../domain/entities/auth/credential.entity';
import { StatusAction } from '../../enums/Status.enum';
import { CredentialSelectors } from '../../states/auth/credential/credential.queries';
import { LoginDto } from '../../../domain/dtos/auth/login.dto';
import { StateCallback } from '../../states/StateCallback.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  private _store = inject(Store);

  credential: Signal<CredentialEntity | null> = this._store.selectSignal(
    (state) => state.credential.credential
  );

  status: Signal<StatusAction> = this._store.selectSignal(
    CredentialSelectors.getStatus
  );

  constructor() {
    this._store.dispatch(new CredentialActions.GetCredentials());
  }


  login( username :string, password : string ,callback : StateCallback<CredentialEntity>) {
    const [ err , dto]= LoginDto.create({username, password});

    if(err) throw new Error(err as string);




    this._store.dispatch(new CredentialActions.Login(dto as LoginDto, callback));

  }

  logount( ) {

    this._store.dispatch(new CredentialActions.Logout());

  }

  clearCredentials() {
    this._store.dispatch(new CredentialActions.ClearCredentials());

  }

  getCredential() {

  }

}
