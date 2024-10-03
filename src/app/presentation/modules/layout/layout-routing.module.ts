import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path : 'identity',
    component: LayoutComponent,
    loadChildren : () => import('../Identity/identity.module').then((m) => m.IdentityModule),
  },
  {
    path : 'warehouse',
    component: LayoutComponent,
    loadChildren: () => import('../warehouse/warehouse.module').then((m) => m.WarehouseModule),
  },

  {
    path : 'pos',
    component: LayoutComponent,
    loadChildren: () => import('../pos/pos.module').then((m) => m.PosModule),
  },
  {
    path : 'process',
    component :LayoutComponent,
    loadChildren: () => import('../process/process.module').then((m) => m.ProcessModule),
  },
  { path: '', redirectTo: 'warehouse', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
