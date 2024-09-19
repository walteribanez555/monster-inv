import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DetailListener } from '../../../../../shared/interfaces/Detail.listener';
import { WarehouseEntity } from '../../../../../../../domain/entities/inventory/warehouse.entity';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemList } from '../../../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { SelectComponent } from "../../../../../shared/components/custom-inputs/select/select.component";

@Component({
  selector: 'app-warehouse-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent,
],
  templateUrl : './warehouse-detail.component.html',
})
export class WarehouseDetailComponent implements OnInit {
  ngOnInit(): void {

    this.warehouseForm = new FormGroup({
      warehouse_id : new FormControl(this.warehouse.warehouse_id),
      name : new FormControl(this.warehouse.name),
      status : new FormControl(this.warehouse.status),
    })

  }

  items: ItemList[] = [
    {
      id: 1,
      name: 'Activo',
    },
    {
      id: 2,
      name: 'Inactivo',
    },
  ];






  @Input() detailListener! : DetailListener<WarehouseEntity>;
  @Input() warehouse! : WarehouseEntity;

  warehouseForm = new FormGroup({
    warehouse_id: new FormControl(),
    name : new FormControl(),
    status : new FormControl(),
  })



  close(){
    this.detailListener.close();
  }

  onSubmit(){
    this.detailListener.submit(this.warehouseForm);
  }

  onDelete() {
    this.detailListener.delete(this.warehouse.warehouse_id);
  }

}
