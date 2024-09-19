import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEntity } from '../../../../../../../domain/entities/inventory/product.entity';
import { WarehouseEntity } from '../../../../../../../domain/entities/inventory/warehouse.entity';
import { ItemListProductsWarehouseComponent } from '../item-list-products-warehouse/item-list-products-warehouse.component';

@Component({
  selector: 'app-list-products-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    ItemListProductsWarehouseComponent,
  ],
  templateUrl : './list-products-warehouse.component.html',
})
export class ListProductsWarehouseComponent {


  @Input() products! : ProductEntity[];

  @Input() warehouses! : WarehouseEntity[];


  selectWarehouse( index: number | null ) {
    this.selectedWarehouse = index ;
    this.actualPage = 1;
    this.filterEvent();
  }

  @Output() onItemSelect = new EventEmitter();

  @Output() onfilterEvent = new EventEmitter();


  onSelectTable( productEntity : ProductEntity) {
    this.onItemSelect.emit(productEntity);
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
