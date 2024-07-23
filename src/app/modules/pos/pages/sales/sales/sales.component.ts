import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SalesHeaderComponent } from '../../../components/sales/sales/sales-header/sales-header.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    SalesHeaderComponent,
    SalesHeaderComponent
],
  templateUrl : './sales.component.html',

})
export class SalesComponent { }
