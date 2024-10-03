import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemTableUserComponent } from '../item-table-user/item-table-user.component';
import { UserEntity } from '../../../../../../domain/entities/identity/user.entity';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemTableUserComponent,
  ],
  templateUrl : './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  ngOnInit(): void {
  }

  @Output() onSelectUser = new EventEmitter();


  @Input() users! : UserEntity[];


  onSelectTable ( user : UserEntity) {
    this.onSelectUser.emit(user);
  }


}
