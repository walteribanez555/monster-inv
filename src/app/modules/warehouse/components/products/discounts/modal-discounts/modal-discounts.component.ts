import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../../../shared/models/modal-content';

@Component({
  selector: 'app-modal-discounts',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-discounts.component.html',
})
export class ModalDiscountsComponent implements ModalContent {
  @Input() form!: FormGroup<any> | null;
  @Input() data!: any;

  @Output() addEvent = new EventEmitter();



  onAddToggle(){
    this.addEvent.emit();
  }
 }
