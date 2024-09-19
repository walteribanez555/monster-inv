import { UpdateInputDto } from "../../dtos/inventory/inputs/update-input.dto";
import { CreateOutputDto } from "../../dtos/inventory/outputs/create-output.dto";
import { OutputEntity } from "../../entities/inventory/output.entity";

export abstract class OutputRepository {
  protected readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  abstract create( dto : CreateOutputDto): Promise<OutputEntity>;
  // abstract update( dto : UpdateInputDto) : Promise<any>;
  abstract get( id : number) : Promise<OutputEntity>;
  abstract getAll(params : {[key:string]: any}) : Promise<OutputEntity[]>;
  abstract delete( id : number) : Promise<any>;
}
