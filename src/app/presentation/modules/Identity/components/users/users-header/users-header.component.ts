import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './users-header.component.html',
})
export class UsersHeaderComponent {



  @Output() onAddToggle = new EventEmitter();


  onAdd() {
    this.onAddToggle.emit();
  }
 }
