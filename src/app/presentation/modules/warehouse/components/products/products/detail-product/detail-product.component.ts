import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { WarehouseEntity } from '../../../../../../../domain/entities/inventory/warehouse.entity';
import { ItemList } from '../../../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { DetailListener } from '../../../../../shared/interfaces/Detail.listener';
import { ProductTypeEntity } from '../../../../../../../domain/entities/inventory/product-type.entity';
import { SelectComponent } from '../../../../../shared/components/custom-inputs/select/select.component';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, SelectComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './detail-product.component.html',
})
export class DetailProductComponent {
  ngOnInit(): void {
    this.productTypeForm = new FormGroup({
      product_type_id: new FormControl(this.productType.product_type_id),
      name: new FormControl(this.productType.name),
      status: new FormControl(this.productType.status),
      type: new FormControl(this.productType.type),
      categories: new FormControl(this.productType.categories),
    });
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


  types : ItemList[] = [
    {
      id : 1,
      name: 'Interno'
    },
    {
      id : 2,
      name : 'Venta',
    },
    {
      id : 3,
      name : 'Elaborado',
    },
    {
      id : 4,
      name: 'Semi Elaborado'
    }
  ]


  @Input() detailListener!: DetailListener<ProductTypeEntity>;
  @Input() productType!: ProductTypeEntity;

  productTypeForm = new FormGroup({
    product_type_id: new FormControl(),
    name: new FormControl(),
    status: new FormControl(),
    type: new FormControl(),
    categories: new FormControl(),
  });

  close() {
    this.detailListener.close();
  }

  onSubmit() {
    this.detailListener.submit(this.productTypeForm);
  }

  onDelete() {
    this.detailListener.delete(this.productType.product_type_id);
  }
}
