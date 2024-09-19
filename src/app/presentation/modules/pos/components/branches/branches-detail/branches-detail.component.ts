import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-branches-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './branches-detail.component.html',
})
export class BranchesDetailComponent {


  close() {

  }
 }
