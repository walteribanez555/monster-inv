import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { WarehouseEntity } from '../../../../../../domain/entities/inventory/warehouse.entity';

@Component({
  selector: 'app-list-warehouses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-warehouses.component.html',
})
export class ListWarehousesComponent {
  @Input() warehouses!: WarehouseEntity[];

  selectedWarehouse: number | null = 10;

  @Output() onfilterEvent = new EventEmitter();

  selectWarehouse(index: number | null) {
    this.selectedWarehouse = index;
    this.filterEvent();
  }

  filterEvent() {
    let params;

    params = {
      warehouse_id: this.selectedWarehouse,
    };

    this.onfilterEvent.emit(params);
  }
}
