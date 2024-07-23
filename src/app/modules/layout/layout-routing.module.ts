import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path : 'warehouse',
    component: LayoutComponent,
    loadChildren: () => import('../warehouse/warehouse.module').then((m) => m.WarehouseModule),
  },
  {
    path : 'user',
    component: LayoutComponent,
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },
  {
    path : 'pos',
    component: LayoutComponent,
    loadChildren: () => import('../pos/pos.module').then((m) => m.PosModule),
  },

  { path: '', redirectTo: 'warehouse', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
