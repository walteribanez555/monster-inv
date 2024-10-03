import { inject, Inject, Injectable } from '@angular/core';
import { ProviderRepository } from '../../../domain/repositories/inventory/provider.repository';
import { CreateProviderDto } from '../../../domain/dtos/inventory/providers/create-provider.dto';
import { UpdateProviderDto } from '../../../domain/dtos/inventory/providers/update-provider.dto';
import { ProviderEntity } from '../../../domain/entities/inventory/provider.entity';
import { envs } from '../../../config/envs';
import { firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseWarehouseRequest } from './warehouses.service';

export interface ResponseProviderRequest {
  provider_id?: number;
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProvidersService extends ProviderRepository {
  constructor(@Inject(envs.BASE_URL) baseUrl: string) {
    super(`${baseUrl}/providers`);
  }

  private _http = inject(HttpClient);

  override create(dto: CreateProviderDto): Promise<ProviderEntity> {
    return firstValueFrom(
      this._http.post<ResponseProviderRequest>(`${this.baseUrl}`, dto).pipe(
        map((response) => {
          const [error, dto] = ProviderEntity.fromObject({
            provider_id: response.id ? response.id : response.provider_id,
            name: response.name,
            phone: response.phone,
            email: response.email,
            address: response.address,
            status: response.status,
          });

          if (error) {
            throw new Error('Error al crear el proveedor: ' + error);
          }

          return dto as ProviderEntity;
        })
      )
    );
  }
  override update(dto: UpdateProviderDto): Promise<ProviderEntity> {
    return firstValueFrom(
      this._http.put<any>(`${this.baseUrl}?id=${dto.provider_id}`, dto).pipe(
        map(() => {
          return new ProviderEntity(
            dto.provider_id,
            dto.name,
            dto.phone,
            dto.email,
            dto.address,
            dto.status
          );
        })
      )
    );
  }
  override get(id: number): Promise<ProviderEntity[]> {
    return firstValueFrom(
      this._http
        .get<ResponseProviderRequest[]>(`${this.baseUrl}?id=${id}`)
        .pipe(
          map((response) => {
            if (response.length === 0) {
              throw new Error('Proveedor no encontrado');
            }

            return response.map((dto) => {
              const [error, provider] = ProviderEntity.fromObject({
                provider_id: dto.id ? dto.id : dto.provider_id,
                name: dto.name,
                phone: dto.phone,
                email: dto.email,
                address: dto.address,
                status: dto.status,
              });

              if (error) {
                throw new Error('Error al obtener el proveedor: ' + error);
              }

              return provider as ProviderEntity;
            });
          })
        )
    );
  }
  override getAll(): Promise<ProviderEntity[]> {
    return firstValueFrom(
      this._http.get<ResponseProviderRequest[]>(this.baseUrl).pipe(
        map((response) => {
          return response.map((dto) => {
            const [error, provider] = ProviderEntity.fromObject({
              provider_id: dto.id ? dto.id : dto.provider_id,
              name: dto.name,
              phone: dto.phone,
              email: dto.email,
              address: dto.address,
              status: dto.status,
            });

            if (error) {
              throw new Error('Error al obtener el proveedor: ' + error);
            }

            return provider as ProviderEntity;
          });
        })
      )
    );
  }
  override delete(id: number): Promise<any> {
    return firstValueFrom(
      this._http.delete<any>(`${this.baseUrl}?id=${id}`).pipe(
        map(() => {
          return 'Proveedor eliminado correctamente';
        })
      )
    );
  }
}
