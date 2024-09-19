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
  @Output() generareReport = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }
  onGenerateReport() {
    this.generareReport.emit({});
  }
}
