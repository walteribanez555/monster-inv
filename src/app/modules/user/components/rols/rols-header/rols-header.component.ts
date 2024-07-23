import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rols-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './rols-header.component.html',

})
export class RolsHeaderComponent {

  @Output() addEvent = new EventEmitter();



  onAddToggle(){
    this.addEvent.emit();
  }


}
