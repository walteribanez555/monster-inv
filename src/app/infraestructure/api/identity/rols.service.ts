import { Inject, inject, Injectable } from '@angular/core';
import { RolRepository } from '../../../domain/repositories/identity/rol.repository';
import { envs } from '../../../config/envs';
import { HttpClient } from '@angular/common/http';
import { CreateRolDto } from '../../../domain/dtos/identity/rol/create-rol.dto';
import { UpdateRolDto } from '../../../domain/dtos/identity/rol/update-rol.dto';
import { RolEntity } from '../../../domain/entities/identity/rol.entity';
import { firstValueFrom, map, throwError } from 'rxjs';

export interface RolRequestResponse {
  rol_id: number;
  id: number;
  rol_name: string;
  rol_structure: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class RolsService extends RolRepository {
  constructor(@Inject(envs.AUTH_URL) authUrl: string) {
    super(`${authUrl}/rols`);
  }

  private _http = inject(HttpClient);

  override getRol(id: number): Promise<RolEntity> {
    throw new Error('Method not implemented.');
  }
  override getRols(): Promise<RolEntity[]> {
    return firstValueFrom(
      this._http.get<RolRequestResponse[]>(`${this.identityUrl}`).pipe(
        map((response) => {
          return response.map((rol) => {
            const [err, entity] = RolEntity.fromObject({
              rol_id: rol.rol_id,
              rol_name: rol.rol_name,
              rol_structure: rol.rol_structure,
              status: rol.status,
            });

            if (err) throwError(err);
            return entity as RolEntity;
          });
        })
      )
    );
  }
  override createRol(dto: CreateRolDto): Promise<RolEntity> {
    return firstValueFrom(
      this._http.post<RolRequestResponse>(`${this.identityUrl}`, dto).pipe(
        map((response) => {
          const [err, entity] = RolEntity.fromObject({
            rol_id: response.id ? response.id : response.rol_id,
            rol_name: response.rol_name,
            rol_structure: response.rol_structure,
            status: response.status,
          });

          if (err) throwError(err);
          return entity as RolEntity;
        })
      )
    );
  }
  override updateRol(dto: UpdateRolDto): Promise<RolEntity> {
    return firstValueFrom(
      this._http.put<RolRequestResponse>(`${this.identityUrl}?id=${dto.rol_id}`, dto).pipe(
        map((response) => {
          const [err, entity] = RolEntity.fromObject({
            rol_id: dto.rol_id,
            rol_name: dto.rol_name,
            rol_structure: dto.rol_structure,
            status: dto.status,
          });

          if (err) throwError(err);
          return entity as RolEntity;
        })
      )
    )
  }
  override deleteRol(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
