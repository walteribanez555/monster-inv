import { Pipe, type PipeTransform } from '@angular/core';

export enum TypeStatus{
  ACTIVE = 1 ,
  INACTIVE = 2,
}


@Pipe({
  name: 'appTypeStatus',
  standalone: true,
})
export class TypeStatusPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): unknown {

    if(typeof value === 'string'){
      value = parseInt(value);
    }


    switch (value) {
      case TypeStatus.ACTIVE:
        return 'Activo';
      case TypeStatus.INACTIVE :
        return 'Inactivo';
      default:
        return 'No definido';
    }
  }

}
