import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-branches-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branches-header.component.html',
})
export class BranchesHeaderComponent {
  @Output() addEvent = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
}
