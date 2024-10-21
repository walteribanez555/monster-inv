import { CreatePreparationDTO } from "../../dtos/process/preparations/create-preparation.dto";
import { UpdatePreparationDTO } from "../../dtos/process/preparations/update-preparation.dto";
import { PreparationEntity } from "../../entities/process/preparation.entity";

export abstract class PreparationRepository {


  public abstract create( dto : CreatePreparationDTO) : Promise<PreparationEntity>;
  public abstract update( dto : UpdatePreparationDTO) : Promise<PreparationEntity>;
  public abstract delete( id : number) : Promise<any>;
  public abstract getById( id : number) : Promise<PreparationEntity>;
  public abstract getAll( params : {[key : string] : any }) : Promise<PreparationEntity[]>;


}
