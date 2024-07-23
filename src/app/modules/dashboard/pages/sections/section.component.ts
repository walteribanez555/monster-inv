import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SectionHeaderComponent } from '../../components/section/section-header/section-header.component';
import { SectionItemsTableComponent } from '../../components/section/section-items-table/section-items-table.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ModalService } from '../../../../shared/services/Modal.service';
import { SectionFormComponent } from '../../components/section/section-form/section-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Section } from '../../models/section';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    SectionHeaderComponent,
    SectionItemsTableComponent,
  ],
  templateUrl: './section.component.html',
})
export class SectionsComponent {
  private modalService = inject(ModalService);

  sectionForm = new FormGroup({
    id: new FormControl<any>(null),
    name: new FormControl<any>(null, Validators.required),
  });

  onAddEvent() {
    this.modalService
      .open(SectionFormComponent, {
        size: 'sm',
        title: 'Agregar Seccion',
        form: this.sectionForm,
        icon : 'assets/icons/heroicons/outline/plus.svg'
      })
      .subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Finalizado');
        },
      });
  }

  onEditEvent(item: Section) {
    const sectionFormComponent = SectionFormComponent;

    this.sectionForm.get('id')?.setValue(item.id);
    this.sectionForm.get('name')?.setValue(item.name);

    this.modalService
      .open(SectionFormComponent, {
        size: 'sm',
        title: 'Editar Secccion',
        form: this.sectionForm,
        icon : 'assets/icons/heroicons/outline/edit.svg'
      })
      .subscribe({
        next: (resp) => {
          const { id, name } = this.sectionForm.value;
          const item : Section = {
            id,
            name,
          };

          this.editItem(item);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          // this.cleanFormValues();
        },
      });
  }

  cleanFormValues() {
    this.sectionForm.value.id = null;
    this.sectionForm.value.name = null;
  }


  createItem ( name : string ) {
  }

  editItem( item : Section) {

  }

}
