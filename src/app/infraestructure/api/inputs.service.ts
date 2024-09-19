import { Inject, inject, Injectable } from '@angular/core';
import { InputRepository } from '../../domain/repositories/inventory/input.repository';
import { CreateInputDto } from '../../domain/dtos/inventory/inputs/create-input.dto';
import { InputEntity } from '../../domain/entities/inventory/input.entity';
import { HttpClient } from '@angular/common/http';
import { envs } from '../../config/envs';
import { firstValueFrom, map } from 'rxjs';

export interface ResponseInputRequest {
  id?: number;
  input_id?: number;
  product_type_id : number,
  provider_id : number,
  quantity : number,
  detail : string,
  warehouse_id : number,
  date_created : string,
  product_id : number,
}



@Injectable({
  providedIn: 'root'
})
export class InputsService  extends InputRepository {

  constructor(@Inject(envs.BASE_URL) baseUrl: string) {
    super(`${baseUrl}/inputs`);
  }

  private _http = inject(HttpClient);



  override create(dto: CreateInputDto): Promise<InputEntity> {
    return firstValueFrom(this._http.post<ResponseInputRequest>(`${this.baseUrl}`, dto).pipe(
      map((response) => {
        const [err, entity] = InputEntity.fromObject({
          input_id: response.input_id ? response.input_id : response.id!,
          product_type_id: response.product_type_id,
          provider_id: response.provider_id,
          quantity: response.quantity,
          detail: response.detail,
          warehouse_id: response.warehouse_id,
          date_created: response.date_created,
          product_id: response.product_id,
        });

        if (err) throw err;

        return entity as InputEntity;
      })
    ));




  }
  override get(id: number): Promise<InputEntity> {
    return firstValueFrom(this._http.get<ResponseInputRequest[]>(`${this.baseUrl}?id=${id}`).pipe(
      map((response) => {
        const [err, entity] = InputEntity.fromObject({
          input_id: response[0].input_id,
          product_type_id: response[0].product_type_id,
          provider_id: response[0].provider_id,
          quantity: response[0].quantity,
          detail: response[0].detail,
          warehouse_id: response[0].warehouse_id,
          date_created: response[0].date_created,
          product_id: response[0].product_id,
        });

        if (err) throw err;

        return entity as InputEntity;
      })
    ));
  }
  override getAll(params: { [key: string]: any; }): Promise<InputEntity[]> {
    //Map the params on queryParams
    return firstValueFrom(this._http.get<ResponseInputRequest[]>(`${this.baseUrl}`, {params}).pipe(
      map((response) => {
        return response.map((response) => {
          const [err, entity] = InputEntity.fromObject({
            input_id: response.input_id,
            product_type_id: response.product_type_id,
            provider_id: response.provider_id,
            quantity: response.quantity,
            detail: response.detail,
            warehouse_id: response.warehouse_id,
            date_created: response.date_created,
            product_id: response.product_id,
          });

          if (err) throw err;

          return entity as InputEntity;
        });
      })
    ));
  }
  override delete(id: number): Promise<any> {
    return firstValueFrom(this._http.delete<ResponseInputRequest[]>(`${this.baseUrl}?id=${id}`));
  }



}
