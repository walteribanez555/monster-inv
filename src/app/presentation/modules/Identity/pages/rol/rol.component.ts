import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolHeaderComponent } from '../../components/rol/rol-header/rol-header.component';
import { RolFormComponent } from '../../components/rol/rol-form/rol-form.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [
    CommonModule,
    RolHeaderComponent,
    RolFormComponent,
  ],
  templateUrl : './rol.component.html',
})
export class RolComponent implements OnInit {
  ngOnInit(): void {
    this.Router.params.subscribe(params => {
      this.params = params;
      if(params['id']){
        this.typeForm = "Editar";
      }
    })
  }

  private Router = inject(ActivatedRoute);


  params? : {[key:string] : any};

  typeForm : string = "Agregar";







}
