import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CashiersHeaderComponent } from '../../../components/sales/cashiers/cashiers-header/cashiers-header.component';
import { ListCashierComponent } from '../../../components/sales/cashiers/list-cashier/list-cashier.component';
import { BranchService } from '../../../../../core/services/api/pos/branch.service';
import { Branch } from '../../../models/branches/Branch';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { CashierDetailComponent } from '../../../components/sales/cashiers/cashier-detail/cashier-detail.component';

@Component({
  selector: 'app-cashiers',
  standalone: true,
  imports: [
    CommonModule,
    CashiersHeaderComponent,
    ListCashierComponent,
    DcDirective,
  ],
  templateUrl : './cashiers.component.html',
})
export class CashiersComponent implements OnInit {

  @ViewChild(DcDirective) dcWrapper! : DcDirective;



  ngOnInit(): void {
    this.branchService.getBranch().subscribe({
      next : ( resp ) => {
        this.branches = resp;
      },
      error : ( err ) => {

      },
      complete : ( ) => {

      }


    })
  }
  onShowItem : boolean = false;

  private branchService = inject(BranchService);

  branches: Branch[] = [];

  onSelectedItem(  ) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory =
      viewContainerRef.createComponent(CashierDetailComponent);
    // componentFactory.instance.inputDetailListener = this.inputDetailListener;
  }



 }
