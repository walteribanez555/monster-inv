import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rols-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl : './rols-header.component.html',
})
export class RolsHeaderComponent {


  @Output() onAddToggleBtn = new EventEmitter();

  onAddToggle() {
    this.onAddToggleBtn.emit();
  }




 }
