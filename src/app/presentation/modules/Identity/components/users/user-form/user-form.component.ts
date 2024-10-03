import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { CodeEditorComponent } from '../../../../shared/components/custom-inputs/code-editor/code-editor.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';
import { UserEntity } from '../../../../../../domain/entities/identity/user.entity';
import { MultipleSelectComponent } from '../../../../shared/components/custom-inputs/multiple-select/multiple-select.component';
import { RolEntity } from '../../../../../../domain/entities/identity/rol.entity';
import { ItemList } from '../../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { SelectComponent } from '../../../../shared/components/custom-inputs/select/select.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CodeEditorComponent,
    MultipleSelectComponent,
    SelectComponent,
  ],
  templateUrl : './user-form.component.html',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class UserFormComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.listItemsRol = this.rols.map( rol => {
        return {
          id: rol.rol_id,
          name : rol.rol_name,
        }
      }
    )



    this.cdr.detectChanges();


    if(this.userEntity){
      this.userForm.patchValue({
        id : this.userEntity.user_id,
        username : this.userEntity.username,
        name : this.userEntity.name,
        roles: this.userEntity.rols,
        status : this.userEntity.status,
      })
    }
    this.cdr.detectChanges();


  }

  private cdr = inject(ChangeDetectorRef);


  isOpen = false;


  listItemsRol : ItemList[] = [];


  statusList : ItemList[] = [
    {
      id : 1,
      name : 'Activo',
    },
    {
      id : 2,
      name : 'Inactivo',
    }
  ]

  userForm = new FormGroup({
    id : new FormControl(),
    username : new FormControl(),
    name : new FormControl(),
    password: new FormControl(),
    confirm : new FormControl(),
    roles: new FormControl(),
    status : new FormControl(),
  })


  @Input() rols! : RolEntity[];
  @Input() userEntity? : UserEntity;
  @Input() detailListener? : DetailListener<UserEntity>;




  close(){
    this.detailListener?.close();
  }

  onSubmit(){
    this.cdr.detectChanges();

    this.detailListener?.submit(this.userForm);
  }

}
