import { NgModule, Version } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { SectionsComponent } from './pages/sections/section.component';
import { VersionComponent } from './pages/version/version.component';
import { ContentComponent } from './pages/content/content.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { OutputsComponent } from './pages/outputs/outputs.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // { path: '', redirectTo: 'sections', pathMatch: 'full' },
      // { path: 'sections' , component: SectionsComponent},
      // { path: 'versions' , component: VersionComponent},
      // { path: 'contents' , component: ContentComponent},
      // { path: 'nfts', component: NftComponent },
      // { path: 'podcast', component: PodcastComponent },
      { path: '' , redirectTo : 'inventory', pathMatch : 'full'},
      { path: 'inventory', component : InventoryComponent},
      { path: 'inputs', component : InputsComponent},
      { path: 'outputs', component : OutputsComponent},
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
