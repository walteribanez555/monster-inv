import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-content-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './content-header.component.html',

})
export class ContentHeaderComponent {

  @Output() addEvent = new EventEmitter();


  onAddToggle(){
    this.addEvent.emit();
  }



}
