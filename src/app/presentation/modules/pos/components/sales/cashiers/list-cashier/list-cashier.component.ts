import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Branch } from '../../../../models/branches/Branch';

@Component({
  selector: 'app-list-cashier',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './list-cashier.component.html',


})
export class ListCashierComponent {

    @Input() branches! : Branch[];


 }
