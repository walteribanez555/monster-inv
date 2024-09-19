import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl : './process.component.html',
})
export class ProcessComponent { }
