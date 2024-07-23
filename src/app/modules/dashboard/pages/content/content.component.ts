import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentHeaderComponent } from '../../components/content/content-header/content-header.component';
import { ContentTableComponent } from '../../components/content/content-table/content-table.component';
import { ModalService } from '../../../../shared/services/Modal.service';
import { ContentFormComponent } from '../../components/content/content-form/content-form.component';
import { FormGroup } from '@angular/forms';
import { Content } from '../../models/content';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    CommonModule,
    ContentHeaderComponent,
    ContentTableComponent,
  ],
  templateUrl : './content.component.html',
})
export class ContentComponent {

  contentForm = new FormGroup({})


  private modalService = inject(ModalService);


  onCreateItem() {
    this.modalService.open(ContentFormComponent, { title: 'Crear Contenido', size: 'sm', form : this.contentForm, icon :'assets/icons/heroicons/outline/plus.svg'}).subscribe({
      next : ( form) => {

      },
      error : ( err ) => {

      },
      complete : (  ) => {

      }
    });
  }


  onSelectItem(item : Content) {
    this.modalService.open(ContentFormComponent, { title: 'Editar Contenido', size: 'sm', form : this.contentForm ,icon: 'assets/icons/heroicons/outline/edit.svg'}).subscribe({
      next : ( form) => {

      },
      error : ( err ) => {

      },
      complete : (  ) => {

      }
    })
  }

}
