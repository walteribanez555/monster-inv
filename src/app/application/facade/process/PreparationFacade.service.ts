import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PreparationActions } from '../../states/process/preparation/preparation.actions';
import { PreparationEntity } from '../../../domain/entities/process/preparation.entity';
import { PreparationSelectors } from '../../states/process/preparation/preparation.queries';
import { StatusAction } from '../../enums/Status.enum';
import { CreatePreparationDTO } from '../../../domain/dtos/process/preparations/create-preparation.dto';
import { StateCallback } from '../../states/StateCallback.interface';
import { UpdatePreparationDTO } from '../../../domain/dtos/process/preparations/update-preparation.dto';

@Injectable({
  providedIn: 'root',
})
export class PreparationFacadeService {
  private store = inject(Store);


  preparations :Signal<PreparationEntity[]> = this.store.selectSignal(PreparationSelectors.getPreparations);

  preparationById : Signal<PreparationEntity | null> = this.store.selectSignal(PreparationSelectors.getPreparationById);

  status : Signal<StatusAction> = this.store.selectSignal(PreparationSelectors.getStatus);





  constructor() {
    this.store.dispatch(
      new PreparationActions.GetAll(
        {},
        {
          onResult: (result) => {
            console.log(result);
          },
          onError: (err) => {
            console.log(err);
          },
        }
      )
    );
  }



  create( dto : CreatePreparationDTO, callback? :StateCallback<PreparationEntity>) {
    this.store.dispatch(new PreparationActions.Create(dto, callback));
  }


  update( dto : UpdatePreparationDTO, callback? : StateCallback<PreparationEntity> ) {
    this.store.dispatch(new PreparationActions.Update(dto ,callback));
  }

  delete( id : number , callback? : StateCallback<any>) {
    this.store.dispatch(new PreparationActions.Delete(id, callback));
  }

  get( id : number , callback? : StateCallback<PreparationEntity>) {
    this.store.dispatch(new PreparationActions.Get(id, callback));
  }

  getAll( params : {[key:string] :  any} , callback? : StateCallback<PreparationEntity[]> ) {
    this.store.dispatch(new PreparationActions.GetAll(params, callback));
  }

}


