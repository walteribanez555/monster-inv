import { TestBed } from '@angular/core/testing';
import { CreateWarehouseService } from '../../../../../app/domain/use-cases/inventory/warehouses/create-warehouse.service';
import { WarehouseRepository } from '../../../../../app/domain/repositories/inventory/warehouse.repository';
import { CreateWarehouseDto } from '../../../../../app/domain/dtos/inventory/warehouses/create-warehouse.dto';
import { WarehouseEntity } from '../../../../../app/domain/entities/inventory/warehouse.entity';
import { environment } from '../../../../../environments/environment.testing';

class MockWarehouseRepository extends WarehouseRepository {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  create = jest.fn();
  delete = jest.fn();
  get = jest.fn();
  getAll = jest.fn();
  update = jest.fn();
}



describe('Create Warehouse UseCase Service', () => {
  let createWarehouseService: CreateWarehouseService;
  let mockWarehouseRepository: jest.Mocked<WarehouseRepository>;

  beforeEach(() => {
    mockWarehouseRepository = new MockWarehouseRepository(environment.api_url);

    TestBed.configureTestingModule({
      providers: [
        CreateWarehouseService,
        { provide: WarehouseRepository, useValue: mockWarehouseRepository }
      ],
    });
    createWarehouseService = TestBed.inject(CreateWarehouseService);
  });

  test('creates a service', () => {
    expect(createWarehouseService).toBeTruthy();
  });

  test('should create a warehouse', async () => {
    const dto = new CreateWarehouseDto('Sucursal', 1);
    const warehouseEntity = new WarehouseEntity(1,'Sucursal', 1);

    mockWarehouseRepository.create.mockResolvedValue(warehouseEntity);

    const resp = await createWarehouseService.execute(dto);

    expect(mockWarehouseRepository.create).toBeCalledWith(expect.any(CreateWarehouseDto));
    expect(mockWarehouseRepository.create).toBeCalledTimes(1);
    expect(resp).toBeInstanceOf(WarehouseEntity);
  });
});
