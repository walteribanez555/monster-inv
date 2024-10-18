import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject, Signal } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormRecipesComponent } from "../../components/recipes/form-recipes/form-recipes.component";
import { ListProductsComponent } from "../../components/shared/list-products/list-products.component";
import { ProductTypeFacadeService } from "../../../../../application/facade/inventory/ProductTypeFacade.service";
import { ProductTypeEntity } from "../../../../../domain/entities/inventory/product-type.entity";
import { ListQuantityInterface } from "../../../shared/components/custom-inputs/list-quantity/interfaces/list-quantity.interface";
import { ItemQuantity } from "../../../shared/components/custom-inputs/list-quantity/interfaces/item-quantity.interface";
import { FormControl, FormGroup } from "@angular/forms";
import { ItemList } from "../../../shared/components/item-list/interfaces/ItemList.interfaces";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormRecipesComponent,
    ListProductsComponent
],
  templateUrl : './recipe.component.html',
})
export class RecipeComponent  {
  ngOnInit(): void {
    const params = this.activatedRouter.snapshot.params;
  }


  constructor() {
    effect(() => {
      this.listProducts = this.products().map( product => {
        return {
          id : product.product_type_id,
          name : product.name
        }
      })
    })
  }




  interfaceListQuantities? : ListQuantityInterface<ItemQuantity>;


  onSelectItem( i : ProductTypeEntity){
    const itemMapped : ItemQuantity = {
      id : i.product_type_id,
      name : i.name,
      value : 0
    }
    this.interfaceListQuantities?.onAddItem(itemMapped);
  }

  private activatedRouter = inject(ActivatedRoute);


  private productTypeFacadeService = inject(ProductTypeFacadeService);

  products : Signal<ProductTypeEntity[]> = this.productTypeFacadeService.productTypes;

  listProducts : ItemList[] = this.products().map( product => {
    return {
      id : product.product_type_id,
      name : product.name
    }
  })


  onCreatedInterface( i : ListQuantityInterface<ItemQuantity>){
    this.interfaceListQuantities = i;
  }


  onCreateRecipe( value : any) {
    console.log({value});
  }


 }
