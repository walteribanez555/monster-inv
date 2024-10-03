import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RolEntity } from '../../../../../../domain/entities/identity/rol.entity';
import { TypeStatusPipe } from "../../../../shared/pipes/type-status.pipe";

@Component({
  selector: '[item-table-rol]',
  standalone: true,
  imports: [
    CommonModule,
    TypeStatusPipe
],
  templateUrl : './item-table-rol.component.html',
})
export class ItemTableRolComponent {

  @Input() rol! : RolEntity;


}
