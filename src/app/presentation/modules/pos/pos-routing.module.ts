import { RouterModule, Routes } from "@angular/router";
import { PosComponent } from "./pos.component";
import { NgModule } from "@angular/core";
import { BranchesComponent } from "./pages/branches/branches.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { CashiersComponent } from "./pages/sales/cashiers/cashiers.component";
import { ClientsComponent } from "./pages/sales/clients/clients.component";
import { SalesComponent } from "./pages/sales/sales/sales.component";


const routes: Routes = [
  {
    path: '',
    component: PosComponent,
    children: [

      { path: '' , redirectTo : 'branches', pathMatch : 'full'},
      { path: 'branches' , component: BranchesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'cashiers' , component: CashiersComponent },
      { path: 'clients' , component: ClientsComponent },
      { path: 'sales' , component: SalesComponent },

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
