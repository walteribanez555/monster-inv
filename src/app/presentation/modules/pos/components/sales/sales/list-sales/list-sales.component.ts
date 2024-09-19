import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Branch } from '../../../../models/branches/Branch';

@Component({
  selector: 'app-list-sales',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './list-sales.component.html',

})
export class ListSalesComponent {


  @Input() branches! : Branch[];



  constructor() { }

  ngOnInit(): void {
  }


}
