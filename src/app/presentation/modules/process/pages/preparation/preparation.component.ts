import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthComponent } from "../../../auth/auth.component";
import { FormPreparationComponent } from "../../components/preparation/form-preparation/form-preparation.component";
import { ListProductsComponent } from "../../components/shared/list-products/list-products.component";
import { ProductFacadeService } from "../../../../../application/facade/inventory/ProductFacade.service";
import { ProductEntity } from "../../../../../domain/entities/inventory/product.entity";
import { ProductTypeFacadeService } from "../../../../../application/facade/inventory/ProductTypeFacade.service";
import { ProductTypeEntity } from "../../../../../domain/entities/inventory/product-type.entity";

@Component({
  selector: 'app-preparation',
  standalone: true,
  imports: [
    CommonModule,
    ListProductsComponent,
    AuthComponent,
    FormPreparationComponent
],
  templateUrl : './preparation.component.html',
})
export class PreparationComponent implements OnInit {
  ngOnInit(): void {
    const params = this.activatedRouter.snapshot.params;
    console.log({params});
  }

  private activatedRouter = inject(ActivatedRoute);


  private productTypeFacadeService = inject(ProductTypeFacadeService);

  products : Signal<ProductTypeEntity[]> = this.productTypeFacadeService.productTypes;






}
