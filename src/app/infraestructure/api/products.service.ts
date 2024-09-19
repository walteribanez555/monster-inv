import { Inject, inject, Injectable } from '@angular/core';
import { ProductRepository } from '../../domain/repositories/inventory/product.repository';
import { ProductEntity } from '../../domain/entities/inventory/product.entity';
import { HttpClient } from '@angular/common/http';
import { envs } from '../../config/envs';
import { firstValueFrom, map } from 'rxjs';

export interface ResponseProductRequest {
  product_id?: number;
  id?: number;
  product_type_id: number;
  warehouse_id : number;
  quantity: number;
  price: number;
  discount : number;
  date_created: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ProductRepository {
  constructor(@Inject(envs.BASE_URL) baseUrl: string) {
    super(`${baseUrl}/products`);
  }

  private _http = inject(HttpClient);

  override get(id: number): Promise<ProductEntity> {
    return firstValueFrom(
      this._http.get<ResponseProductRequest[]>(`${this.baseUrl}?id=${id}`).pipe(
        map((resp) => {
          const [err, entity] = ProductEntity.fromObject({
            product_id: resp[0].product_id,
            warehouse_id: resp[0].id,
            product_type_id: resp[0].product_type_id,
            quantity: resp[0].quantity,
            price: resp[0].price,
            discount: resp[0].discount,
            date_created: resp[0].date_created,
          });
          if (err) throw err;

          return entity as ProductEntity;
        })
      )
    );
  }
  override getAll(params: { [key: string]: any }): Promise<ProductEntity[]> {
    console.log("Aqui llega");

    return firstValueFrom( this._http.get<ResponseProductRequest[]>(`${this.baseUrl}`,{params}).pipe(
      map((response) => {
        return response.map((resp) => {
          const [err, entity] = ProductEntity.fromObject({
            product_id: resp.product_id,
            warehouse_id: resp.warehouse_id,
            product_type_id: resp.product_type_id,
            quantity: resp.quantity,
            price: resp.price,
            discount : resp.discount ? resp.discount : 0,
            date_created: resp.date_created,
          });
          if (err) {
            console.log(err);
            throw err;
          }
          return entity as ProductEntity;
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
}
