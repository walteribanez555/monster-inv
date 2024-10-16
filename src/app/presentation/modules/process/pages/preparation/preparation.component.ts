import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthComponent } from "../../../auth/auth.component";
import { FormPreparationComponent } from "../../components/preparation/form-preparation/form-preparation.component";
import { ListProductsComponent } from "../../components/shared/list-products/list-products.component";

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




}
