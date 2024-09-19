import { CreateInputDto } from '../../dtos/inventory/inputs/create-input.dto';
import { UpdateInputDto } from '../../dtos/inventory/inputs/update-input.dto';
import { InputEntity } from '../../entities/inventory/input.entity';

export abstract class InputRepository {
  protected readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  abstract create(dto: CreateInputDto): Promise<InputEntity>;
  abstract get(id: number): Promise<InputEntity>;
  abstract getAll(params: { [key: string]: any }): Promise<InputEntity[]>;
  abstract delete(id: number): Promise<any>;
}
