import { AuthRepository } from "../domain/repositories/auth/auth.repository";
import { RolRepository } from "../domain/repositories/identity/rol.repository";
import { UserRepository } from "../domain/repositories/identity/user.repository";
import { InputRepository } from "../domain/repositories/inventory/input.repository";
import { OutputRepository } from "../domain/repositories/inventory/output.repository";
import { ProductTypeRepository } from "../domain/repositories/inventory/product-type.repository";
import { ProductRepository } from "../domain/repositories/inventory/product.repository";
import { ProviderRepository } from "../domain/repositories/inventory/provider.repository";
import { WarehouseRepository } from "../domain/repositories/inventory/warehouse.repository";
import { AuthService } from "../infraestructure/api/auth/auth.service";
import { RolsService } from "../infraestructure/api/identity/rols.service";
import { UsersService } from "../infraestructure/api/identity/users.service";
import { InputsService } from "../infraestructure/api/inventory/inputs.service";
import { OutputsService } from "../infraestructure/api/inventory/outputs.service";
import { ProductTypeService } from "../infraestructure/api/inventory/product-type.service";
import { ProductsService } from "../infraestructure/api/inventory/products.service";
import { ProvidersService } from "../infraestructure/api/inventory/providers.service";
import { WarehousesService } from "../infraestructure/api/inventory/warehouses.service";



export class UnitOfWork {

  public static repositories = [
    {
      provide: WarehouseRepository,
      useClass: WarehousesService,
    },
    {
      provide: ProviderRepository,
      useClass: ProvidersService,
    },
    {
      provide: ProductTypeRepository,
      useClass: ProductTypeService,
    },
    {
      provide: InputRepository,
      useClass: InputsService,
    },
    {
      provide: OutputRepository,
      useClass: OutputsService,
    },
    {
      provide: ProductRepository,
      useClass : ProductsService
    },
    {
      provide : AuthRepository,
      useClass : AuthService,
    },
    {
      provide : UserRepository,
      useClass : UsersService,
    },
    {
      provide : RolRepository,
      useClass : RolsService,
    }
  ]


}
