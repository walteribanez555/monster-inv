import { inject, Pipe, type PipeTransform } from '@angular/core';
import { ProductTypeFacadeService } from '../../../../application/facade/inventory/ProductTypeFacade.service';
import { StatusAction } from '../../../../application/enums/Status.enum';

@Pipe({
  name: 'appProduct',
  standalone: true,
  pure : false
})
export class ProductPipe implements PipeTransform {

  private typeProductFacadeService = inject(ProductTypeFacadeService);

  typeProducts = this.typeProductFacadeService.productTypes;

  transform(value: any, ...args: any[]) {
    if(this.typeProductFacadeService.statusAction() === StatusAction.LOADING){
      return 'Cargando...';
    }

    const typeProduct = this.typeProducts().find( typeProduct => typeProduct.product_type_id == value);

    return typeProduct ? typeProduct.name : 'No Encontrado ';
  }



}
