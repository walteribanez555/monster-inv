import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientsHeaderComponent } from '../../../components/sales/clients/clients-header/clients-header.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ClientsHeaderComponent,
  ],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {

  onShowItem = false;

 }
