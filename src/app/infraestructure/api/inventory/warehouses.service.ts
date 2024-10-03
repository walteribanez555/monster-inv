import { Inject, inject, Injectable } from '@angular/core';
import { WarehouseRepository } from '../../../domain/repositories/inventory/warehouse.repository';
import { CreateWarehouseDto } from '../../../domain/dtos/inventory/warehouses/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../../domain/dtos/inventory/warehouses/update-warehouse.dto';
import { WarehouseEntity } from '../../../domain/entities/inventory/warehouse.entity';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, of, throwError } from 'rxjs';
import { envs } from '../../../config/envs';

export interface ResponseWarehouseRequest {
  id?: number;
  warehouse_id?: number;
  name: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class WarehousesService extends WarehouseRepository {
  constructor(@Inject(envs.BASE_URL) baseUrl: string) {
    super(`${baseUrl}/warehouses`);
  }

  private _http = inject(HttpClient);

  create(dto: CreateWarehouseDto): Promise<WarehouseEntity> {
    return firstValueFrom(
      this._http
        .post<ResponseWarehouseRequest>(`${this.baseUrl}`, dto)
        .pipe(
          map((response) => {
            const objResponseWarehouse = WarehouseEntity.fromObject({
              warehouse_id: response.id ? response.id : response.warehouse_id,
              name: response.name,
              status: response.status,
            });

            if (!objResponseWarehouse[1]) {
              throw new Error(
                'Error al crear la sucursal : ' + objResponseWarehouse[0]
              );
            }

            return objResponseWarehouse[1] as WarehouseEntity;
          }),
          catchError((error) => {
            return throwError(
              () => new Error('Error al crear la sucursal: ' + error.message)
            );
          })
        )
    );
  }

  update(dto: UpdateWarehouseDto): Promise<WarehouseEntity> {
    return firstValueFrom(
      this._http.put<any>(
        `${this.baseUrl}?id=${dto.warehouse_id}`,
        dto
      ).pipe(
        map(() => {
          return new WarehouseEntity(dto.warehouse_id, dto.name, dto.status);
        })
      )
    );
  }

  get(id: number): Promise<WarehouseEntity[]> {
    return firstValueFrom(
      this._http.get<WarehouseEntity[]>(`${this.baseUrl}?id=${id}`).pipe(
        map((response) => {
          return response.map((warehouse) => {
            return WarehouseEntity.fromObject(warehouse)[1] as WarehouseEntity;
          });
        }),
        catchError((error) => {
          return throwError(
            () => new Error('Error al obtener la sucursal: ' + error.message)
          );
        })
      )
    );
  }


  getAll(): Promise<WarehouseEntity[]> {
    return firstValueFrom(
      this._http.get<WarehouseEntity[]>(this.baseUrl).pipe(
        map((response) => {
          return response.map((warehouse) => {
            return WarehouseEntity.fromObject(warehouse)[1] as WarehouseEntity;
          });
        }),
        catchError((error) => {
          return throwError(
            () => new Error('Error al obtener las sucursales: ' + error.message)
          );
        })
      )
    );
  }
  delete(id: number): Promise<WarehouseEntity[]> {
    return firstValueFrom(
      this._http.delete<WarehouseEntity[]>(`${this.baseUrl}?id=${id}`)
    );
  }
}
