import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent } from "angular-svg-icon";
import { Product } from "../../../../warehouse/models/products/Product";
import { ProductEntity } from "../../../../../../domain/entities/inventory/product.entity";
import { ProductTypeEntity } from "../../../../../../domain/entities/inventory/product-type.entity";

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl : './list-products.component.html',
})
export class ListProductsComponent {

  displayList : boolean  = true;


  onDisplayList() {
    this.displayList = !this.displayList;
  }



  @Input()  products! : ProductTypeEntity[]

 }
