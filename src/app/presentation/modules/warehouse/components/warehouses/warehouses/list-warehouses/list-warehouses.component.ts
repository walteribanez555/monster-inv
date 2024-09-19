import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemTableWarehouseComponent } from '../item-table-warehouse/item-table-warehouse.component';
import { Warehouse } from '../../../../models/warehouses/warehouse.model';
import { WarehouseEntity } from '../../../../../../../domain/entities/inventory/warehouse.entity';

@Component({
  selector: 'app-list-warehouses',
  standalone: true,
  imports: [
    CommonModule,
    ItemTableWarehouseComponent,
  ],
  templateUrl : './list-warehouses.component.html',
})
export class ListWarehousesComponent {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  @Input() services!: any[];

  @Input() warehouses! : WarehouseEntity[];

  @Output() onSelectItem = new EventEmitter();


  onSelectTable(warehouse : Warehouse) {

    // if(item[5]){
    //   return;
    // }

    this.onSelectItem.emit(warehouse);
  }


}
