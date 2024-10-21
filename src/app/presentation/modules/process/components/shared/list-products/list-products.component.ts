import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from "angular-svg-icon";
import { Product } from "../../../../warehouse/models/products/Product";
import { ProductEntity } from "../../../../../../domain/entities/inventory/product.entity";
import { ProductTypeEntity } from "../../../../../../domain/entities/inventory/product-type.entity";
import { TypeProductPipe } from "../../../../shared/pipes/type-product.pipe";
import { ProductPipe } from "../../../../shared/pipes/product.pipe";

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    TypeProductPipe,
    ProductPipe,
  ],
  templateUrl : './list-products.component.html',
})
export class ListProductsComponent {

  displayList : boolean  = true;


  @Output() onSelectItemEvent = new EventEmitter();


  onSelectItem ( item : ProductEntity) {

    this.onSelectItemEvent.emit(item);
  }

  onDisplayList() {
    this.displayList = !this.displayList;
  }



  @Input()  products! : ProductEntity[];

 }
