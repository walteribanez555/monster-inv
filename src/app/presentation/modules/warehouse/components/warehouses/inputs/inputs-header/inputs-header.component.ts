import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-inputs-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inputs-header.component.html',
})
export class InputsHeaderComponent {
  @Output() addEvent = new EventEmitter();
  @Output() generareReport = new EventEmitter();

  onAddToggle() {
    this.addEvent.emit();
  }

  onGenerateReport() {
    this.generareReport.emit();
  }
}
