import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormRecipesComponent } from "../../components/recipes/form-recipes/form-recipes.component";
import { ListProductsComponent } from "../../components/shared/list-products/list-products.component";
import { ProductTypeFacadeService } from "../../../../../application/facade/inventory/ProductTypeFacade.service";
import { ProductTypeEntity } from "../../../../../domain/entities/inventory/product-type.entity";

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
export class RecipeComponent {
  ngOnInit(): void {
    const params = this.activatedRouter.snapshot.params;
    console.log({params});
  }

  private activatedRouter = inject(ActivatedRoute);


  private productTypeFacadeService = inject(ProductTypeFacadeService);

  products : Signal<ProductTypeEntity[]> = this.productTypeFacadeService.productTypes;

 }
