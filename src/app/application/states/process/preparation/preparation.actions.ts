// export class PreparationAction {
//   static readonly type = '[Preparation] Add item';
//   constructor(readonly payload: string) { }
// }

import { CreatePreparationDTO } from '../../../../domain/dtos/process/preparations/create-preparation.dto';
import { UpdatePreparationDTO } from '../../../../domain/dtos/process/preparations/update-preparation.dto';
import { PreparationEntity } from '../../../../domain/entities/process/preparation.entity';
import { StateCallback } from '../../StateCallback.interface';

export namespace PreparationActions {
  export class Get {
    static readonly type = '[Preparation] Get Item';
    constructor(
      readonly id: number,
      readonly callback?: StateCallback<PreparationEntity>
    ) {}
  }

  export class GetAll {
    static readonly type = '[Preparation] Get All';
    constructor(
      readonly params: { [key: string]: any },
      readonly callback?: StateCallback<PreparationEntity[]>
    ) {}
  }

  export class Create {
    static readonly type = '[Preparation] Create Item';
    constructor(
      readonly dto: CreatePreparationDTO,
      readonly callback?: StateCallback<PreparationEntity>
    ) {}
  }

  export class Update {
    static readonly type = '[Preparation] Update Item';
    constructor(
      readonly dto: UpdatePreparationDTO,
      readonly callback?: StateCallback<PreparationEntity>
    ) {}
  }

  export class Delete {
    static readonly type = '[Preparation] Delete Item';
    constructor(readonly id: number, readonly callback?: StateCallback<any>) {}
  }
}
