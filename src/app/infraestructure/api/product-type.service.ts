import { inject, Inject, Injectable } from '@angular/core';
import { ProductTypeRepository } from '../../domain/repositories/inventory/product-type.repository';
import { CreateProductTypeDto } from '../../domain/dtos/inventory/product-types/create-product-type';
import { UpdateProductTypeDto } from '../../domain/dtos/inventory/product-types/update-product-type';
import { ProductTypeEntity } from '../../domain/entities/inventory/product-type.entity';
import { envs } from '../../config/envs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

// export interface ResponseProviderRequest {
//   provider_id?: number;
//   id?: number;
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
//   status: number;
// }

export interface ResponseProductTypeRequest {
  id?: number;
  product_type_id?: number;
  name: string;
  status: string;
  categories: string;
  type: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService extends ProductTypeRepository {
  constructor(@Inject(envs.BASE_URL) baseUrl: string) {
    super(`${baseUrl}/product-types`);
  }

  private _http = inject(HttpClient);

  override create(dto: CreateProductTypeDto): Promise<ProductTypeEntity> {
    return firstValueFrom(
      this._http.post<ResponseProductTypeRequest>(`${this.baseUrl}`, dto).pipe(
        map((response) => {
          const [err, dto] = ProductTypeEntity.fromObject({
            product_type_id: response.product_type_id
              ? response.product_type_id
              : response.id!,
            status: response.status,
            categories: response.categories,
            type: response.type,
            name: response.name,
          });

          if (err) throw err;

          return dto as ProductTypeEntity;
        })
      )
    );
  }
  override udpate(dto: UpdateProductTypeDto): Promise<ProductTypeEntity> {
    return firstValueFrom(
      this._http
        .put<any>(`${this.baseUrl}?id=${dto.product_type_id}`, dto)
        .pipe(
          map((response) => {
            const [err, entity] = ProductTypeEntity.fromObject({
              product_type_id: dto.product_type_id,
              status: dto.status,
              categories: dto.categories,
              type: dto.type,
              name: dto.name,
            });

            if (err) throw err;

            return entity as ProductTypeEntity;
          })
        )
    );
  }
  override get(id: number): Promise<ProductTypeEntity[]> {
    return firstValueFrom(
      this._http
        .get<ResponseProductTypeRequest[]>(`${this.baseUrl}?id=${id}`)
        .pipe(
          map((response) => {
            return response.map((item) => {
              const [err, dto] = ProductTypeEntity.fromObject({
                product_type_id: item.product_type_id
                  ? item.product_type_id
                  : item.id!,
                status: item.status,
                categories: item.categories,
                type: item.type,
                name: item.name,
              });

              if (err) throw err;

              return dto as ProductTypeEntity;
            });
          })
        )
    );
  }
  override getAll(): Promise<ProductTypeEntity[]> {
    return firstValueFrom(
      this._http.get<ResponseProductTypeRequest[]>(`${this.baseUrl}`).pipe(
        map((response) => {
          return response.map((item) => {
            const [err, dto] = ProductTypeEntity.fromObject({
              product_type_id: item.product_type_id
                ? item.product_type_id
                : item.id!,
              status: item.status,
              categories: item.categories,
              type: item.type,
              name: item.name,
            });

            if (err) throw err;

            return dto as ProductTypeEntity;
          });
        })
      )
    );
  }
  override delete(id: number): Promise<any> {
    return firstValueFrom(this._http.delete(`${this.baseUrl}?id=${id}`));
  }
}
