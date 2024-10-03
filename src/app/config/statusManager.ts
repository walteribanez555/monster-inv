import { provideStore } from "@ngxs/store";
import { CredentialState } from "../application/states/auth/credential/credential.state";
import { RolState } from "../application/states/identity/rol/rol.state";
import { UserState } from "../application/states/identity/user/user.state";
import { InputState } from "../application/states/inventory/input/input.state";
import { OutputState } from "../application/states/inventory/output/output.state";
import { ProductTypeState } from "../application/states/inventory/product-type/product-type.state";
import { ProductState } from "../application/states/inventory/product/product.state";
import { ProviderState } from "../application/states/inventory/provider/provider.state";
import { WarehouseState } from "../application/states/inventory/warehouse/warehouse.state";


export class StatusManager {

  public static status = provideStore([
    WarehouseState,
    ProviderState,
    ProductTypeState,
    InputState,
    OutputState,
    ProductState,
    UserState,
    RolState,
    CredentialState,
  ])

}
