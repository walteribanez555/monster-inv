import { inject, Injectable, Input, Signal } from '@angular/core';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { StatusAction } from '../../enums/Status.enum';
import { InputSelectors } from '../../states/inventory/input/input.queries';
import { InputEntity } from '../../../domain/entities/inventory/input.entity';
import { InputActions } from '../../states/inventory/input/input.actions';
import { CreateInputDto } from '../../../domain/dtos/inventory/inputs/create-input.dto';
import { firstValueFrom } from 'rxjs';
import { generateCsv, downloadCSV } from '../../../presentation/utils/reports.utils';
import { ProducTypeSelectors } from '../../states/inventory/product-type/product-type.queries';
import { ProviderSelectors } from '../../states/inventory/provider/provider.queries';
import { WarehouseSelectors } from '../../states/inventory/warehouse/warehouse.queries';

@Injectable({
  providedIn: 'root'
})
export class InputFacadeService {

  private _store = inject(Store);

  statusAction : Signal<StatusAction> = this._store.selectSignal(
    InputSelectors.getStatus
  );

  inputs : Signal<InputEntity[]> = this._store.selectSignal(
    InputSelectors.getInputs
  )

  input : Signal<InputEntity | null> = this._store.selectSignal(
    InputSelectors.getInput
  )


  constructor(private actions$ : Actions) {

    //create the dates of today with init and end
    const init = new Date().toISOString().split('T')[0];
    // const end = new Date().toISOString().split('T')[0];
    //end day with one day plus
    const end = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];




    this._store.dispatch(new InputActions.GetAll({init, end}));
  }


  addItem(
    product_type_id : number,
    provider_id : number,
    warehouse_id : number,
    detail : string,
    quantity : number,

  ) {

    console.log(product_type_id, provider_id, warehouse_id, detail, quantity);

    const [err, dto ] = CreateInputDto.create({
      product_type_id,
      provider_id,
      warehouse_id,
      detail,
      quantity
    });

    if(err) {
      console.log(err);
      return;
    }

    this._store.dispatch(new InputActions.Create(dto as CreateInputDto));

  }

  getItems(params : {[key:string] : any}){
    this._store.dispatch(new InputActions.GetAll(params));
  }

  getItem(id : number){
    this._store.dispatch(new InputActions.Get(id));
  }

  async createReport(params: { [key: string]: any }) {
    this._store.dispatch(new InputActions.GetAll(params));

    await firstValueFrom(
      this.actions$.pipe(ofActionCompleted(InputActions.GetAll))
    );


    const warehouses = this._store.selectSnapshot(
      WarehouseSelectors.getWarehouses
    );

    const product_types = this._store.selectSnapshot(
      ProducTypeSelectors.getProductTypes
    );

    const providers = this._store.selectSnapshot(
      ProviderSelectors.getProviders
    );



    const inputs = this.inputs();

    const reportData = inputs.map((input) => {
      return {
        Fecha: input.date_created,
        Producto: input.product_type_id,
        Cantidad: input.quantity,
        Detalle: input.detail,
        Almacen: warehouses.find(
          (warehouse) => warehouse.warehouse_id === input.warehouse_id
        )?.name,
        TipoProducto: product_types.find(
          (product_type) => product_type.product_type_id === input.product_type_id
        )?.name,
        Proveedor: providers.find(
          (provider) => provider.provider_id === input.provider_id
        )?.name,
      };
    });

    const csvContent = generateCsv(reportData);
    downloadCSV(csvContent, 'reporte.csv');
  }
}
