import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products/products.component';
import { DiscountsComponent } from './pages/products/discounts/discounts.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { WarehouseComponent } from './warehouse.component';
import { InputsComponent } from './pages/warehouses/inputs/inputs.component';
import { WarehousesComponent } from './pages/warehouses/warehouses/warehouses.component';
import { OutputsComponent } from './pages/warehouses/outputs/outputs.component';

const routes: Routes = [
  {
    path: '',
    component: WarehouseComponent,
    children: [
      { path: '', redirectTo: 'warehouses', pathMatch: 'full' },
      // { path: 'branches' , component: BranchesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'discounts', component: DiscountsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'warehouses', component: WarehousesComponent },
      { path: 'inputs', component: InputsComponent },
      { path: 'outputs', component: OutputsComponent },

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
