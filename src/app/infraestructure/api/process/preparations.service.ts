
import { inject,  Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PreparationRepository } from '../../../domain/repositories/process/preparation.repository';
import { CreatePreparationDTO } from '../../../domain/dtos/process/preparations/create-preparation.dto';
import { UpdatePreparationDTO } from '../../../domain/dtos/process/preparations/update-preparation.dto';
import { PreparationEntity } from '../../../domain/entities/process/preparation.entity';

@Injectable({
  providedIn: 'root'
})
export class PreparationsService extends PreparationRepository {
  public override create(dto: CreatePreparationDTO): Promise<PreparationEntity> {
    throw new Error('Method not implemented.');
  }
  public override update(dto: UpdatePreparationDTO): Promise<PreparationEntity> {
    throw new Error('Method not implemented.');
  }
  public override delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public override getById(id: number): Promise<PreparationEntity> {
    throw new Error('Method not implemented.');
  }
  public override getAll(params: { [key: string]: any; }): Promise<PreparationEntity[]> {
    throw new Error('Method not implemented.');
  }


  private url = environment.api_url

  private http = inject(HttpClient);

  constructor() {
    super();
  }






}
