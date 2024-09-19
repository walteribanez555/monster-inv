import { CreateProviderDto } from "../../dtos/inventory/providers/create-provider.dto";
import { UpdateProviderDto } from "../../dtos/inventory/providers/update-provider.dto";
import { ProviderEntity } from "../../entities/inventory/provider.entity";

export abstract class ProviderRepository {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  abstract create( dto : CreateProviderDto) : Promise<ProviderEntity>;
  abstract update( dto : UpdateProviderDto) : Promise<ProviderEntity>;
  abstract get( id : number) : Promise<ProviderEntity[]>;
  abstract getAll() : Promise<ProviderEntity[]>;
  abstract delete ( id : number) : Promise<any>;
}
