import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RolEntity } from '../../../../../../domain/entities/identity/rol.entity';
import { ItemTableRolComponent } from '../item-table-rol/item-table-rol.component';

@Component({
  selector: 'app-rols-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemTableRolComponent,
  ],
  templateUrl : './rols-list.component.html',
})
export class RolsListComponent {


  @Output() onSelectRol = new EventEmitter();


  @Input() rols : RolEntity[] = [];



  onSelectTable ( rol : RolEntity) {
    this.onSelectRol.emit(rol);
  }

}
