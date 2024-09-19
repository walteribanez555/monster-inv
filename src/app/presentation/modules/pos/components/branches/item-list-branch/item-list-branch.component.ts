import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Branch } from '../../../models/branches/Branch';

@Component({
  selector: '[item-list-branch]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './item-list-branch.component.html',
})
export class ItemListBranchComponent {

  @Input() branch! : Branch;


 }
