import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProviderProduct } from '../../../../models/providers/ProviderProduct';
import { ProviderEntity } from '../../../../../../../domain/entities/inventory/provider.entity';

@Component({
  selector: '[item-table-provider]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './item-table-provider.component.html',
})
export class ItemTableProviderComponent {

  @Input() providerProduct! : ProviderEntity;


}
