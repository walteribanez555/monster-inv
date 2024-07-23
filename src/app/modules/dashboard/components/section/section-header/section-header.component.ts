import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './section-header.component.html',
})
export class SectionHeaderComponent {

    @Output() addEvent = new EventEmitter();



    onAddToggle(){
      this.addEvent.emit();
    }



 }
