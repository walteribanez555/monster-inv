import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { WarehouseEntity } from '../../../../../../domain/entities/inventory/warehouse.entity';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-warehouses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-warehouses.component.html',
})
export class ListWarehousesComponent implements OnInit {
  ngOnInit(): void {
    this.activateParams.params.subscribe((params) => {
      const {id} = params;
      this.selectedWarehouse = id ? id : null;
      this.onfilterEvent.emit({
        warehouse_id : id
      });

      console.log(this.selectedWarehouse);
      this.cdr.detectChanges();
    })


    const {id} = this.activateParams.snapshot.params;


    this.selectedWarehouse = id ? id : null;
    this.onfilterEvent.emit({
      warehouse_id : id
    });

    console.log(this.selectedWarehouse);
    this.cdr.detectChanges();
  }



 get DirWarehouse() : string {
  const url = location.pathname.split('/');

  const segments = url.splice(1,url.length-1);

  this.selectedWarehouse ? segments.pop() : null;


  return segments.join('/');
 }


  private activateParams = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);


  @Input() warehouses!: WarehouseEntity[];

  selectedWarehouse: number | null = null;

  @Output() onfilterEvent = new EventEmitter();

  selectWarehouse(index: number | null) {

  }

  filterEvent() {
    let params;

    params = {
      warehouse_id: this.selectedWarehouse,
    };

    this.onfilterEvent.emit(params);
  }
}
