import { Inject, inject, Injectable } from '@angular/core';
import { OutputRepository } from '../../domain/repositories/inventory/output.repository';
import { HttpClient } from '@angular/common/http';
import { envs } from '../../config/envs';
import { CreateOutputDto } from '../../domain/dtos/inventory/outputs/create-output.dto';
import { OutputEntity } from '../../domain/entities/inventory/output.entity';
import { firstValueFrom, map } from 'rxjs';


export interface ResponseOutputRequest {
  id?: number;
  output_id?: number;
  product_type_id : number;
  warehouse_id : number;
  quantity : number;
  detail : string;
  product_id : number;
  date_created : string;
}


@Injectable({
  providedIn: 'root'
})
export class OutputsService extends OutputRepository {
  override create(dto: CreateOutputDto): Promise<OutputEntity> {
    return firstValueFrom( this._http.post<ResponseOutputRequest>(`${this.baseUrl}`, dto).pipe(
      map((response) => {
        const [err, entity] = OutputEntity.fromObject({
          output_id: response.output_id ? response.output_id : response.id!,
          product_type_id: response.product_type_id,
          warehouse_id: response.warehouse_id,
          quantity: response.quantity,
          detail: response.detail,
          product_id: response.product_id,
          date_created: response.date_created,
        });

        if (err) throw err;

        return entity as OutputEntity;
      })
    ))
  }


  override get(id: number): Promise<OutputEntity> {
    return firstValueFrom( this._http.get<ResponseOutputRequest[]>(`${this.baseUrl}?id=${id}`).pipe(
      map((response) => {
        const [err, entity] = OutputEntity.fromObject({
          output_id: response[0].output_id ? response[0].output_id : response[0].id!,
          product_type_id: response[0].product_type_id,
          warehouse_id: response[0].warehouse_id,
          quantity: response[0].quantity,
          detail: response[0].detail,
          product_id: response[0].product_id,
          date_created: response[0].date_created,
        });

        if(err) throw err;

        return entity as OutputEntity;
      })
    ) )
  }


  override getAll(params : {[key:string]: any}): Promise<OutputEntity[]> {
    return firstValueFrom(this._http.get<ResponseOutputRequest[]>(`${this.baseUrl}`, {params}).pipe(
      map((response) => {
        return response.map((response) => {
          const [err, dto] = OutputEntity.fromObject({
            output_id: response.output_id ? response.output_id : response.id!,
            product_type_id: response.product_type_id,
            warehouse_id: response.warehouse_id,
            quantity: response.quantity,
            detail: response.detail,
            product_id: response.product_id,
            date_created: response.date_created,
          });

          if (err) throw err;

          return dto as OutputEntity;
        });
      })
    ));
  }


  override delete(id: number): Promise<any> {
    return firstValueFrom(this._http.delete<any>(`${this.baseUrl}?id=${id}`).pipe(
      map((response) => {
        return response;
      })
    ));
  }

  constructor(@Inject(envs.BASE_URL) baseUrl: string) {
    super(`${baseUrl}/outputs`);
  }

  private _http = inject(HttpClient);
}
