import { inject, Injectable, Signal } from '@angular/core';
import { ofActionCompleted, Store } from '@ngxs/store';
import { PreparationActions } from '../../states/process/preparation/preparation.actions';
import { PreparationEntity } from '../../../domain/entities/process/preparation.entity';
import { PreparationSelectors } from '../../states/process/preparation/preparation.queries';
import { StatusAction } from '../../enums/Status.enum';
import { CreatePreparationDTO } from '../../../domain/dtos/process/preparations/create-preparation.dto';
import { StateCallback } from '../../states/StateCallback.interface';
import { UpdatePreparationDTO } from '../../../domain/dtos/process/preparations/update-preparation.dto';
import { firstValueFrom } from 'rxjs';
import { generateCsv, downloadCSV } from '../../../presentation/utils/reports.utils';
import { InputActions } from '../../states/inventory/input/input.actions';
import { ProducTypeSelectors } from '../../states/inventory/product-type/product-type.queries';
import { ProviderSelectors } from '../../states/inventory/provider/provider.queries';
import { WarehouseSelectors } from '../../states/inventory/warehouse/warehouse.queries';
import { ItemList } from '../../../presentation/modules/shared/components/item-list/interfaces/ItemList.interfaces';

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

  itemsListStates: ItemList[] = [
    {
      id: 1,
      name: 'Interno',
    },
    {
      id: 2,
      name: 'Venta',
    },
    {
      id: 3,
      name: 'Elaborado',
    },
    {
      id: 4,
      name: 'Semi Elaborado',
    },
  ];


  async createReport(params: { [key: string]: any }) {
    this.store.dispatch(new InputActions.GetAll(params));


    this.getAll( params, {
      onResult:  ( preparations ) => {
        const warehouses = this.store.selectSnapshot(
          WarehouseSelectors.getWarehouses
        );

        const product_types = this.store.selectSnapshot(
          ProducTypeSelectors.getProductTypes
        );

        const reportData = preparations.map((preparation) => {
          return {
            produccion : preparation.preparation_id,
            Fecha: preparation.date_created,
            Tipo: this.itemsListStates.find( i => i.id == preparation.type)?.name,
            Cantidad: preparation.quantity,
            Detalle: preparation.description,
            Almacen: warehouses.find(
              (warehouse) => warehouse.warehouse_id === preparation.warehouse_id
            )?.name,
            Producto: product_types.find(
              (product_type) => product_type.product_type_id === preparation.product_type_id
            )?.name,
            // Proveedor: providers.find(
            //   (provider) => provider.provider_id === preparation.provider_id
            // )?.name,
          };
        });

        const csvContent = generateCsv(reportData);
        downloadCSV(csvContent, 'reporte.csv');

      },
      onError : ( err) => {

      }
    })

    // await firstValueFrom(
    //   this.actions$.pipe(ofActionCompleted(InputActions.GetAll))
    // );



  }

}


