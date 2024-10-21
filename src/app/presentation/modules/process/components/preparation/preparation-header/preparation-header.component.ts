import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-preparation-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl : './preparation-header.component.html',

})
export class PreparationHeaderComponent { }
