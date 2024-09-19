import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Branch } from '../../../models/branches/Branch';
import { ItemListBranchComponent } from '../item-list-branch/item-list-branch.component';

@Component({
  selector: 'app-list-branches',
  standalone: true,
  imports: [
    CommonModule,
    ItemListBranchComponent,
  ],
  templateUrl : './list-branches.component.html',
})
export class ListBranchesComponent {


  @Input() branches! : Branch[];

  @Output() itemSelected = new EventEmitter();


  onSelectTable(branch : Branch) {
    this.itemSelected.emit(branch);
  }

}
