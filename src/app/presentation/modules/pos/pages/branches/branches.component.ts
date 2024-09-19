import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BranchesHeaderComponent } from '../../components/branches/branches-header/branches-header.component';
import { ModalBranchesComponent } from '../../components/branches/modal-branches/modal-branches.component';
import { ListBranchesComponent } from '../../components/branches/list-branches/list-branches.component';
import { BranchService } from '../../../../core/services/api/pos/branch.service';
import { Branch } from '../../models/branches/Branch';
import { ActionType } from '../../../shared/enum/action';
import { ModalService } from '../../../shared/services/Modal.service';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { BranchesDetailComponent } from '../../components/branches/branches-detail/branches-detail.component';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [
    CommonModule,
    BranchesHeaderComponent,
    ListBranchesComponent,
    DcDirective,
  ],
  templateUrl: './branches.component.html',
})
export class BranchesComponent implements OnInit {

  @ViewChild(DcDirective) dcWrapper!: DcDirective;


  ngOnInit(): void {
    this.branchService.getBranch().subscribe({
      next: (resp) => {
        this.branches = resp;
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  private modalService = inject(ModalService);
  private branchService = inject(BranchService);

  branches: Branch[] = [];

  onSelectedItem( item : Branch) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory =
      viewContainerRef.createComponent(BranchesDetailComponent);

    this.onShowItem = true;


  }

  onShowItem = false;

  onAddEvent() {
    this.modalService.open(ModalBranchesComponent, {
      title: `Ingresar tus api keys`,
      size: 'sm',
      forms: null,
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Ingresar',
        },
      ],
    });
  }
}
