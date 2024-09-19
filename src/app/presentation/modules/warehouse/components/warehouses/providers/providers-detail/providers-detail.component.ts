import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../../shared/components/custom-inputs/select/select.component';
import { DetailListener } from '../../../../../shared/interfaces/Detail.listener';
import { ProviderEntity } from '../../../../../../../domain/entities/inventory/provider.entity';
import { ItemList } from '../../../../../shared/components/item-list/interfaces/ItemList.interfaces';

@Component({
  selector: 'app-providers-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl : './providers-detail.component.html',
})
export class ProvidersDetailComponent implements OnInit {
  ngOnInit(): void {
    this.providerForm = new FormGroup({
      provider_id : new FormControl(this.provider.provider_id),
      name : new FormControl(this.provider.name),
      phone : new FormControl(this.provider.phone),
      email : new FormControl(this.provider.email),
      address : new FormControl(this.provider.address),
      status : new FormControl(this.provider.status),
    })
  }


  @Input() detailListener!: DetailListener<ProviderEntity>;
  @Input() provider! : ProviderEntity;

  items: ItemList[] = [
    {
      id: 1,
      name: 'Activo',
    },
    {
      id: 2,
      name: 'Inactivo',
    },
  ];


  providerForm = new FormGroup({
    provider_id : new FormControl(),
    name : new FormControl(),
    phone : new FormControl(),
    email : new FormControl(),
    address : new FormControl(),
    status : new FormControl(),
  });


  close( ) {
    this.detailListener.close();
  }


  onSubmit() {
    this.detailListener.submit(this.providerForm);
  }


  onDelete() {
    this.detailListener.delete(this.provider.provider_id);
  }
}
