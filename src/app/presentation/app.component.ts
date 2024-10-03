import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveHelperComponent } from './modules/shared/components/responsive-helper/responsive-helper.component';
import { WarehouseService } from './core/services/api/inventory/warehouse.service';
import { WarehousesService } from '../infraestructure/api/inventory/warehouses.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ResponsiveHelperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

  }
  title = 'inv';




}
