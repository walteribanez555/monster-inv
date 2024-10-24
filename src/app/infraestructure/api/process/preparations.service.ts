import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PreparationRepository } from '../../../domain/repositories/process/preparation.repository';
import { CreatePreparationDTO } from '../../../domain/dtos/process/preparations/create-preparation.dto';
import { UpdatePreparationDTO } from '../../../domain/dtos/process/preparations/update-preparation.dto';
import { PreparationEntity } from '../../../domain/entities/process/preparation.entity';
import { firstValueFrom, map } from 'rxjs';

export interface ResponseRequestDto {
  id?: number;
  preparation_id?: number;
  warehouse_id: number;
  status: number;
  description: string;
  date_created: string;
  quantity: number;
  items: any[];
}

@Injectable({
  providedIn: 'root',
})
export class PreparationsService extends PreparationRepository {
  public override create(
    dto: CreatePreparationDTO
  ): Promise<PreparationEntity> {
    return firstValueFrom(
      this.http.post<ResponseRequestDto>(this.url, dto).pipe(
        map((item) => {
          const [err, entity] = PreparationEntity.fromObj({
            ...item,
            preparation_id: item.preparation_id ? item.preparation_id : item.id,
          });

          if (err) throw err;

          return entity as PreparationEntity;
        })
      )
    );
  }
  public override update(
    dto: UpdatePreparationDTO
  ): Promise<PreparationEntity> {
    throw new Error('Method not implemented.');
  }
  public override delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public override getById(id: number): Promise<PreparationEntity> {
    return firstValueFrom(
      this.http.get<ResponseRequestDto[]>(`${this.url}?id=${id}`).pipe(
        map((items) => {
          const itemsMapped = items.map((item) => {
            const [err, entity] = PreparationEntity.fromObj({
              ...item,
              preparation_id: item.preparation_id
                ? item.preparation_id
                : item.id,
            });

            if (err) throw err;

            return entity as PreparationEntity;
          });
          return itemsMapped[0];
        })
      )
    );
  }
  public override getAll(params: {
    [key: string]: any;
  }): Promise<PreparationEntity[]> {
    return firstValueFrom(
      this.http.get<ResponseRequestDto[]>(this.url, { params }).pipe(
        map((items) => {
          return items.map((item) => {
            const [err, entity] = PreparationEntity.fromObj({
              ...item,
              preparation_id: item.preparation_id
                ? item.preparation_id
                : item.id,
            });

            if (err) throw err;

            return entity as PreparationEntity;
          });
        })
      )
    );
  }

  private url = `${environment.api_url}/preparations`;

  private http = inject(HttpClient);

  constructor() {
    super();
  }
}
