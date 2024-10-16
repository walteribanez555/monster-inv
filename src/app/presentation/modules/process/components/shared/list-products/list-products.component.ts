import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from "angular-svg-icon";

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


 }
