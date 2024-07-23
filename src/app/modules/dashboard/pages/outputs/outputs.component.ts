import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { OutputsHeaderComponent } from "../../../warehouse/components/warehouses/outputs/outputs-header/outputs-header.component";

@Component({
  selector: 'app-outputs',
  standalone: true,
  imports: [
    CommonModule,
    OutputsHeaderComponent
],
  templateUrl : './outputs.component.html',
})
export class OutputsComponent { }
