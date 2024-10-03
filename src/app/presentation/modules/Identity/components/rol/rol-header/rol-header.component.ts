import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rol-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl : './rol-header.component.html',
})
export class RolHeaderComponent {

  @Input() typeForm! : string ;




}
