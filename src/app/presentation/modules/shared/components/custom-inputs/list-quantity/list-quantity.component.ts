import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuantityComponent } from "../quantity/quantity.component";
import { SvgIconComponent } from "angular-svg-icon";

@Component({
  selector: 'app-list-quantity',
  standalone: true,
  imports: [
    CommonModule,
    QuantityComponent,
    SvgIconComponent,
],
  templateUrl : './list-quantity.component.html',
})
export class ListQuantityComponent { }
