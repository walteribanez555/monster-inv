import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-identity',
  standalone: true,
  templateUrl: './identity.component.html',
  imports : [
    RouterOutlet
  ],
})
export class IdentityComponent {}
