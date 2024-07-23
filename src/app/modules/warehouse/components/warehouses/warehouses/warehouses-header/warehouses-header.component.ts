import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-warehouses-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouses-header.component.html',
})
export class WarehousesHeaderComponent {
  @Output() addEvent = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
}
