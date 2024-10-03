import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolEntity } from '../../../../../../domain/entities/identity/rol.entity';
import { CodeEditorComponent } from '../../../../shared/components/custom-inputs/code-editor/code-editor.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-rol-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CodeEditorComponent,
  ],
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
  templateUrl : './rol-form.component.html',
})
export class RolFormComponent implements OnInit {
  ngOnInit(): void {
    if(this.rol) {
      this.rolForm.patchValue(
        {
          id : this.rol.rol_id,
          name : this.rol.rol_name,
          structure : this.rol.rol_structure,
          status : this.rol.status,
        }
      )
    }
  }

  isOpen = false;




  @Input() rol? : RolEntity
  @Input() listener! : DetailListener<RolEntity>
  defaultValueStructure : string = '{\n  \"apps\" : [\n    {\n      \"name\" : \"inventory\",\n      \"pages\" : [\n        \"identity/rols\"\n      ]\n    }\n  ],\n  \"services\" : [\n    {\n      \"name\" : \"inventory\",\n      \"endpoints\":[\n        {\n          \"name\" : \"warehouses\",\n          \"methods\" : [\n            \"GET\",\n            \"POST\",\n            \"PUT\",\n            \"DELETE\"\n          ]\n        }\n      ]\n      \n    }\n\n  ]\n}';


  rolForm = new FormGroup({
    id : new FormControl(),
    name : new FormControl(),
    structure : new FormControl(this.defaultValueStructure),
    status : new FormControl(),
  });


  close(){
    this.listener.close();
  }



  onSubmit() {
    this.listener.submit(this.rolForm);
  }








}
