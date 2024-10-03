import { inject, Pipe, type PipeTransform } from '@angular/core';
import { WarehouseFacadeService } from '../../../../application/facade/inventory/WarehouseFacade.service';
import { StatusAction } from '../../../../application/enums/Status.enum';

@Pipe({
  name: 'appWarehouse',
  standalone: true,
  pure : false
})
export class WarehousePipe implements PipeTransform {

  private warehouseFacadeService = inject(WarehouseFacadeService);

  warehouses = this.warehouseFacadeService.warehouses;

  transform(value: unknown, ...args: unknown[]): unknown {
    if(this.warehouseFacadeService.statusAction() === StatusAction.LOADING){
      return 'Cargando...';
    }

    const warehouse = this.warehouses().find( warehouse => warehouse.warehouse_id == value);

    return warehouse ? warehouse.name : 'No Encontrado ';

  }
}
