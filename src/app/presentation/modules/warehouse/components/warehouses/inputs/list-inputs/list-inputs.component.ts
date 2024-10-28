import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Warehouse } from '../../../../models/warehouses/warehouse.model';
import { ItemTableInputComponent } from '../item-table-input/item-table-input.component';
import { InputProduct } from '../../../../models/inputs/inputs.model';
import { WarehouseEntity } from '../../../../../../../domain/entities/inventory/warehouse.entity';
import { InputEntity } from '../../../../../../../domain/entities/inventory/input.entity';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-inputs',
  standalone: true,
  imports: [
    CommonModule,
    ItemTableInputComponent,
    NgClass,
    RouterModule,
  ],
  templateUrl : './list-inputs.component.html',

})
export class ListInputsComponent  implements AfterViewInit {
  ngAfterViewInit(): void {
    const { id } =   this.activatedRoute.snapshot.params;


    if(!id) {
      this.selectedWarehouse = 0;
    }

    this.selectedWarehouse = id;

    this.filterEvent();

  }


  private activatedRoute = inject(ActivatedRoute);

  @Input() warehouses! : WarehouseEntity[];

  @Input() inputs! : InputEntity[];


  @Output() onItemSelect = new EventEmitter();

  @Output() onfilterEvent = new EventEmitter();


  onSelectTable( inputProduct : InputEntity) {
    this.onItemSelect.emit(inputProduct);
  }

  selectWarehouse( index: number | null ) {
    this.selectedWarehouse = index ;
    this.actualPage = 1;
    this.filterEvent();
  }



  actualPage = 1;
  itemsPerPage = 30;
  selectedWarehouse  : number | null = null;

  previousPage() {
    if(this.actualPage > 1) {
      this.actualPage = this.actualPage - 1;
    }


    this.filterEvent();
  }

  nextPage() {
    this.actualPage = this.actualPage + 1;
    this.filterEvent();

  }




  filterEvent() {
    let params;



    if( this.selectedWarehouse ) {
      console.log("Con Warehouse");


      params= {
        warehouse_id : this.selectedWarehouse,
        limit : this.itemsPerPage,
        offset : (this.actualPage - 1) * this.itemsPerPage
      }

    }else{
      console.log("Sin Warehouse");

      params= {

        limit : this.itemsPerPage,
        offset : (this.actualPage - 1) * this.itemsPerPage
      }


    }





    this.onfilterEvent.emit(params);

  }



}
