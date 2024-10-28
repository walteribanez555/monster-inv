import { CommonModule } from '@angular/common';
import {  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Warehouse } from '../../../../models/warehouses/warehouse.model';
import { ItemTableOutputComponent } from '../item-table-output/item-table-output.component';
import { OutputProduct } from '../../../../models/outputs/outputs.model';
import { WarehouseEntity } from '../../../../../../../domain/entities/inventory/warehouse.entity';
import { OutputEntity } from '../../../../../../../domain/entities/inventory/output.entity';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list-outputs',
  standalone: true,
  imports: [
    CommonModule,
    ItemTableOutputComponent,
    RouterModule,
  ],
  templateUrl : './list-outputs.component.html',
})
export class ListOutputsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const { id } =   this.activatedRoute.snapshot.params;


    if(!id) {
      this.selectedWarehouse = 0;
    }

    this.selectedWarehouse = id;

    this.filterEvent();

  }
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);






  @Output() onItemSelect = new EventEmitter();
  @Output() onfilterEvent = new EventEmitter();


  @Input() warehouses! : WarehouseEntity[];

  @Input() outputs! : OutputEntity[];



  onSelectTable( outputProduct : OutputEntity) {
    this.onItemSelect.emit(outputProduct);
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



    if( this.selectedWarehouse && this.selectedWarehouse > 0  ) {
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
