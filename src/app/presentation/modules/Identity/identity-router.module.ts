import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { IdentityComponent } from "./identity.component";
import { UsersComponent } from "./pages/users/users.component";
import { RolsComponent } from "./pages/rols/rols.component";
import { RolComponent } from "./pages/rol/rol.component";



const routes : Routes = [
  {
    path : '',
    component : IdentityComponent,
    children:  [
      {
        path : '',
        redirectTo : 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component : UsersComponent,
      },
      {
        path : 'rols',
        component : RolsComponent,
      },
      // {
      //   path : 'rol',
      //   component : RolComponent,
      // },
      // {
      //   path : 'rol/:id',
      //   component : RolComponent,
      // },
      {
        path : '**',
        redirectTo : 'errors/404'
      }

    ]
  }



];



@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule],
})
export class IdentityRoutingModule { }
