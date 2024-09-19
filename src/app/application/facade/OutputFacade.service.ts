import { inject, Injectable, Signal } from '@angular/core';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { StatusAction } from '../enums/Status.enum';
import { OutputSelectors } from '../states/output/output.queries';
import { OutputEntity } from '../../domain/entities/inventory/output.entity';
import { OutputActions } from '../states/output/output.actions';
import { CreateInputDto } from '../../domain/dtos/inventory/inputs/create-input.dto';
import { CreateOutputDto } from '../../domain/dtos/inventory/outputs/create-output.dto';
import {
  downloadCSV,
  generateCsv,
} from '../../presentation/utils/reports.utils';
import { firstValueFrom } from 'rxjs';
import { WarehouseSelectors } from '../states/warehouse/warehouse.queries';
import { ProducTypeSelectors } from '../states/product-type/product-type.queries';

@Injectable({
  providedIn: 'root',
})
export class OutputFacadeService {
  private _store = inject(Store);

  statusAction: Signal<StatusAction> = this._store.selectSignal(
    OutputSelectors.getStatus
  );

  outputs: Signal<OutputEntity[]> = this._store.selectSignal(
    OutputSelectors.getOutputs
  );

  output: Signal<OutputEntity | null> = this._store.selectSignal(
    OutputSelectors.getOutput
  );


  constructor(private actions$: Actions) {
    const init = new Date().toISOString().split('T')[0];

    const end = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    this._store.dispatch(new OutputActions.GetAll({ init, end }));
  }

  addItem(
    product_type_id: number,
    warehouse_id: number,
    detail: string,
    quantity: number
  ) {
    const [err, dto] = CreateOutputDto.create({
      product_type_id,
      warehouse_id,
      detail,
      quantity,
    });

    if (err) throw err;

    this._store.dispatch(new OutputActions.Create(dto as CreateOutputDto));
  }

  getItems(params: { [key: string]: any }) {
    this._store.dispatch(new OutputActions.GetAll(params));
  }

  getItem(id: number) {
    this._store.dispatch(new OutputActions.Get(id));
  }

  async createReport(params: { [key: string]: any }) {
    this._store.dispatch(new OutputActions.GetAll(params));

    await firstValueFrom(
      this.actions$.pipe(ofActionCompleted(OutputActions.GetAll))
    );

    const warehouses = this._store.selectSnapshot(
      WarehouseSelectors.getWarehouses
    );

    const product_types = this._store.selectSnapshot(
      ProducTypeSelectors.getProductTypes
    )



    const outputs = this.outputs();

    const reportData = outputs.map((output) => {
      return {
        Fecha: output.date_created,
        Producto: output.product_type_id,
        Cantidad: output.quantity,
        Detalle: output.detail,
        Almacen: warehouses.find(
          (warehouse) => warehouse.warehouse_id === output.warehouse_id
        )?.name,
        TipoProducto: product_types.find(
          (product_type) => product_type.product_type_id === output.product_type_id
        )?.name,
      };
    });

    const csvContent = generateCsv(reportData);
    downloadCSV(csvContent, 'reporte.csv');
  }
}
