import { Pipe, type PipeTransform } from '@angular/core';


export enum ETypeProduct {
  INTERN =1,
  TOSOLD = 2,
  ELABORATED = 3,
  SEMIELABORATED= 4,
}


@Pipe({
  name: 'appTypeProduct',
  standalone: true,
})
export class TypeProductPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    let valueResponse = '';
      switch (value) {
        case ETypeProduct.INTERN:
          valueResponse += 'Interno';
          break;
        case ETypeProduct.TOSOLD:
          valueResponse += 'Para vender';
          break;
        case ETypeProduct.ELABORATED :
          valueResponse += 'Elaborado';
          break;
        case  ETypeProduct.SEMIELABORATED:
          valueResponse += 'Semi Elaborado'
          break;
        default:
          valueResponse += 'No definido';
          break;
      }

    return valueResponse;
  }

}
