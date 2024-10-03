import { inject, Pipe, type PipeTransform } from '@angular/core';
import { ProviderFacadeService } from '../../../../application/facade/inventory/ProviderFacade.service';
import { StatusAction } from '../../../../application/enums/Status.enum';
import { Observable, map, startWith } from 'rxjs';

@Pipe({
  name: 'appProvider',
  standalone: true,
  pure: false  // Hacemos el pipe impuro para que se revalúe cuando cambie el signal
})
export class ProviderPipe implements PipeTransform {

  private providerFacadeService = inject(ProviderFacadeService);

  // Signal que contiene los proveedores
  providers = this.providerFacadeService.providers;

  transform(value: number): string | null {

    // Comprobar si aún está en estado de carga
    if (this.providerFacadeService.statusAction() === StatusAction.LOADING) {
      return 'Cargando...';
    }

    // Si ya no está cargando, buscar el proveedor en el signal
    const provider = this.providers().find(provider => provider.provider_id === value);

    // Si encuentra el proveedor, retorna su nombre; si no, un mensaje de "No encontrado"
    return provider ? provider.name : 'No encontrado';
  }
}
