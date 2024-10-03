import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserEntity } from '../../../../../../domain/entities/identity/user.entity';
import { TypeStatusPipe } from "../../../../shared/pipes/type-status.pipe";

@Component({
  selector: '[item-table-user]',
  standalone: true,
  imports: [
    CommonModule,
    TypeStatusPipe,
    NgClass
],
  templateUrl : './item-table-user.component.html',
})
export class ItemTableUserComponent {
  @Input() user! : UserEntity;


 }
