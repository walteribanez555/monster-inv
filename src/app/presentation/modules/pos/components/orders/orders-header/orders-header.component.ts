import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-orders-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-header.component.html',
})
export class OrdersHeaderComponent {
  @Output() addEvent = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
}
