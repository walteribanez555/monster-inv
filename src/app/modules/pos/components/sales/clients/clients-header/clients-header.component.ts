import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clients-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-header.component.html',
})
export class ClientsHeaderComponent {
  @Output() addEvent = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
}
