import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Warehouse } from '../../../../models/warehouses/warehouse.model';
import { WarehouseEntity } from '../../../../../../../domain/entities/inventory/warehouse.entity';
import { TypeStatusPipe } from '../../../../../shared/pipes/type-status.pipe';

@Component({
  selector: '[content-table-item]',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    TypeStatusPipe,
    NgClass,
  ],
  templateUrl : './item-table-warehouse.component.html',

})
export class ItemTableWarehouseComponent {

  @Input() warehouse! : WarehouseEntity;
  @Output() toggleItem = new EventEmitter();



  constructor() {}

  ngOnInit(): void {


    // this.service_id = this.service[0];
    // this.service_token = this.service[1];
    // this.service_price = this.service[3];
    // this.service_name = this.service[4];
    // this.service_status = this.service[5];


    // console.log(this.service);



  }


  onToggleItem () {
    // this.toggleItem.emit(this.service);
  }


 }
