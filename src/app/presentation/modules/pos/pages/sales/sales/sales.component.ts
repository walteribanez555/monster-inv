import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { SalesHeaderComponent } from '../../../components/sales/sales/sales-header/sales-header.component';
import { Branch } from '../../../models/branches/Branch';
import { BranchService } from '../../../../../core/services/api/pos/branch.service';
import { ListSalesComponent } from '../../../components/sales/sales/list-sales/list-sales.component';
import { ListBranchesComponent } from "../../../components/branches/list-branches/list-branches.component";
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { DetailProductComponent } from '../../../../warehouse/components/products/products/detail-product/detail-product.component';
import { SalesDetailComponent } from '../../../components/sales/sales/sales-detail/sales-detail.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    SalesHeaderComponent,
    ListSalesComponent,
],
  templateUrl : './sales.component.html',

})
export class SalesComponent {



  onShowItem = false;
  @ViewChild(DcDirective) dcWrapper! : DcDirective;


  private brancheService = inject(BranchService);

  constructor() { }

  ngOnInit(): void {
    this.brancheService.getBranch().subscribe({
      next : ( resp ) => {
        this.branches = resp;
      },
      error : ( err )=> {

      },
      complete: ( ) => {

      }
    })

  }


  branches : Branch[] = [];

  onViewItem(  ) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory =
      viewContainerRef.createComponent(SalesDetailComponent);
    // componentFactory.instance.inputDetailListener = this.inputDetailListener;
    // componentFactory.instance.inputProduct = input;

    this.onShowItem = true;
  }


}
