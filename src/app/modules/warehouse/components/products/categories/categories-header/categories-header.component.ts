import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-categories-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './categories-header.component.html',

})
export class CategoriesHeaderComponent {

  @Output() addEvent = new EventEmitter();



  onAddToggle(){
    this.addEvent.emit();
  }


}
