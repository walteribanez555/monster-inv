import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sales-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sales-detail.component.html',
})
export class SalesDetailComponent {


  close() {

  }


}
