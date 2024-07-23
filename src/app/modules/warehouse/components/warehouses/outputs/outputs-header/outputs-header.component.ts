import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-outputs-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outputs-header.component.html',
})
export class OutputsHeaderComponent {
  @Output() addEvent = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
}
