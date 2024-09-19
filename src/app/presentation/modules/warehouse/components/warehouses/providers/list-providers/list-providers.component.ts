import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProviderProduct } from '../../../../models/providers/ProviderProduct';
import { ItemTableProviderComponent } from '../item-table-provider/item-table-provider.component';
import { ProviderEntity } from '../../../../../../../domain/entities/inventory/provider.entity';

@Component({
  selector: 'app-list-providers',
  standalone: true,
  imports: [
    CommonModule,
    ItemTableProviderComponent,
  ],
  templateUrl : './list-providers.component.html',

})
export class ListProvidersComponent {

  @Input() providers : ProviderEntity[] = [];
  @Output() onSelectItem = new EventEmitter();


  onSelectTable( providerProduct : ProviderEntity) {
    this.onSelectItem.emit(providerProduct);
  }

 }
