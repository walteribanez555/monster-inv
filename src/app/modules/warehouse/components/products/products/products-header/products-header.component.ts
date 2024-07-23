import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './products-header.component.html',

})
export class ProductsHeaderComponent {


  @Output() addEvent = new EventEmitter();



  onAddToggle(){
    this.addEvent.emit();
  }

 }
