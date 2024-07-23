import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CashiersHeaderComponent } from '../../../components/sales/cashiers/cashiers-header/cashiers-header.component';

@Component({
  selector: 'app-cashiers',
  standalone: true,
  imports: [
    CommonModule,
    CashiersHeaderComponent,
  ],
  templateUrl : './cashiers.component.html',
})
export class CashiersComponent { }
