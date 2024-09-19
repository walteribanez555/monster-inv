import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-providers-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './providers-header.component.html',

})
export class ProvidersHeaderComponent {


  @Output() onToggleBtn = new EventEmitter();





  onAddToggle() {
    this.onToggleBtn.emit();
  }
}
