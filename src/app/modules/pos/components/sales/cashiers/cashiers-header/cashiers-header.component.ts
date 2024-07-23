import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cashiers-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cashiers-header.component.html',
})
export class CashiersHeaderComponent {
  @Output() addEvent = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
}
