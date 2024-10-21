import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListQuantityComponent } from "../../../../shared/components/custom-inputs/list-quantity/list-quantity.component";
import { ListQuantityInterface } from "../../../../shared/components/custom-inputs/list-quantity/interfaces/list-quantity.interface";
import { ItemQuantity } from "../../../../shared/components/custom-inputs/list-quantity/interfaces/item-quantity.interface";
import { SelectComponent } from "../../../../shared/components/custom-inputs/select/select.component";
import { ProductEntity } from "../../../../../../domain/entities/inventory/product.entity";
import { ListView } from "../../../../shared/components/listview/interfaces/ListView";
import { ItemList } from "../../../../shared/components/item-list/interfaces/ItemList.interfaces";

@Component({
  selector: 'app-form-recipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListQuantityComponent,
    SelectComponent
],
  templateUrl : './form-recipes.component.html',
})
export class FormRecipesComponent {


  @Input() listProducts! : ItemList[];


  listQuantityInterface? : ListQuantityInterface<ItemQuantity>;
  @Output() onReceivedInterfaceList = new EventEmitter();
  @Output() onSubmitEvent = new EventEmitter();


  onInterfaceQuantityReceived( i : ListQuantityInterface<ItemQuantity>){
    this.listQuantityInterface = i;
    this.onReceivedInterfaceList.emit(i);
  }


  formRecipe : FormGroup = new FormGroup({
    product : new FormControl(),
    quantity : new FormControl(),
    date : new FormControl(),
    description : new FormControl(),
    items : new FormControl(),
  })



  onSubmit(){


    if(!this.formRecipe.valid) return;

    this.onSubmitEvent.emit(this.formRecipe.value);
  }



}
