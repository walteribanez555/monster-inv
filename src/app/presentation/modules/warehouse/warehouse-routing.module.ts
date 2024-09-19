import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products/products.component';
import { DiscountsComponent } from './pages/products/discounts/discounts.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { WarehouseComponent } from './warehouse.component';
import { InputsComponent } from './pages/warehouses/inputs/inputs.component';
import { WarehousesComponent } from './pages/warehouses/warehouses/warehouses.component';
import { OutputsComponent } from './pages/warehouses/outputs/outputs.component';
import { ProvidersComponent } from './pages/warehouses/providers/providers.component';
import { ProductsWarehouseComponent } from './pages/products/products-warehouse/products-warehouse.component';

const routes: Routes = [
  {
    path: '',
    component: WarehouseComponent,
    children: [
      { path: '', redirectTo: 'warehouses', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'products-warehouse' , component : ProductsWarehouseComponent},
      { path: 'discounts', component: DiscountsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'warehouses', component: WarehousesComponent },
      { path: 'inputs', component: InputsComponent },
      { path: 'outputs', component: OutputsComponent },
      { path: 'providers', component :ProvidersComponent},

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
