import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEntity } from "../../../../../../domain/entities/inventory/product.entity";
import { SvgIconComponent } from "angular-svg-icon";
import { ItemList } from "../../../../shared/components/item-list/interfaces/ItemList.interfaces";

@Component({
  selector: 'app-list-type-products',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl: './list-type-products.component.html',
  host : {
    class : ' w-full md:w-1/3'
  }

})
export class ListTypeProductsComponent {

  displayList : boolean  = true;


  @Output() onSelectItemEvent = new EventEmitter();
  @Output() onItemSelect = new EventEmitter();



  onSelectItem ( item : ItemList) {

    console.log(item);
    this.onSelectItemEvent.emit(item);
  }

  onDisplayList() {
    this.displayList = !this.displayList;
  }



  @Input()  items! : ItemList[];



}
