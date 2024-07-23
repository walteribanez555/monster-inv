import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './inputs.component.html',
})
export class InputsComponent { }
