import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sales-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-header.component.html',
})
export class SalesHeaderComponent {
  @Output() addEvent = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
}
