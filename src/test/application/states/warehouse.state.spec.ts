import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { WarehouseState } from '../../../app/application/states/warehouse/warehouse.state';
import { WarehouseEntity } from '../../../app/domain/entities/inventory/warehouse.entity';
import { WarehouseActions } from '../../../app/application/states/warehouse/warehouse.actions';
import { WarehouseSelectors } from '../../../app/application/states/warehouse/warehouse.queries';
import { CreateWarehouseDto } from '../../../app/domain/dtos/inventory/warehouses/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../../app/domain/dtos/inventory/warehouses/update-warehouse.dto';
import { CreateWarehouseService } from '../../../app/domain/use-cases/inventory/warehouses/create-warehouse.service';
import { DeleteWarehouseService } from '../../../app/domain/use-cases/inventory/warehouses/delete-warehouse.service';
import { GetWarehouseService } from '../../../app/domain/use-cases/inventory/warehouses/get-warehouse.service';
import { GetWarehousesService } from '../../../app/domain/use-cases/inventory/warehouses/get-warehouses.service';
import { UpdateWarehouseService } from '../../../app/domain/use-cases/inventory/warehouses/update-warehouse.service';
import { firstValueFrom } from 'rxjs';

class MockCreateWarehouseService {
  execute(dto: CreateWarehouseDto): Promise<WarehouseEntity> {
    return Promise.resolve(new WarehouseEntity(1, dto.name, dto.status));
  }
}

class MockUpdateWarehouseService {
  execute(dto: UpdateWarehouseDto): Promise<WarehouseEntity> {
    return Promise.resolve(
      new WarehouseEntity(dto.warehouse_id, dto.name, dto.status)
    );
  }
}

class MockDeleteWarehouseService {
  execute(id: number): Promise<{ warehouse_id: number }> {
    return Promise.resolve({ warehouse_id: id });
  }
}

class MockGetWarehouseService {
  execute(id: number): Promise<WarehouseEntity[]> {
    return Promise.resolve([new WarehouseEntity(id, 'Warehouse 1', 1)]);
  }
}

class MockGetWarehousesService {
  execute(): Promise<WarehouseEntity[]> {
    return Promise.resolve([
      new WarehouseEntity(1, 'Warehouse 1', 1),
      new WarehouseEntity(2, 'Warehouse 2', 1),
    ]);
  }
}

describe('Warehouse state', () => {
  let _store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore([WarehouseState]),
        {
          provide: CreateWarehouseService,
          useClass: MockCreateWarehouseService,
        },
        {
          provide: UpdateWarehouseService,
          useClass: MockUpdateWarehouseService,
        },
        {
          provide: DeleteWarehouseService,
          useClass: MockDeleteWarehouseService,
        },
        {
          provide: GetWarehouseService,
          useClass: MockGetWarehouseService,
        },
        {
          provide: GetWarehousesService,
          useClass: MockGetWarehousesService,
        },
      ],
    });

    _store = TestBed.inject(Store);
  });

  it('should get all warehouses', async () => {
    await firstValueFrom(_store.dispatch(new WarehouseActions.GetAll()));

    const state = _store.selectSnapshot(WarehouseSelectors.getWarehouses);

    expect(state).toEqual([
      new WarehouseEntity(1, 'Warehouse 1', 1),
      new WarehouseEntity(2, 'Warehouse 2', 1),
    ]);
  });

  it('should get a warehouse by id', async () => {
    await firstValueFrom(_store.dispatch(new WarehouseActions.Get(1)));

    const state = _store.selectSnapshot(WarehouseSelectors.getWarehouse);

    expect(state).toEqual(new WarehouseEntity(1, 'Warehouse 1', 1));
  });

  it('should create a warehouse', async () => {
    await firstValueFrom(
      _store.dispatch(
        new WarehouseActions.Create(new CreateWarehouseDto('Warehouse demo', 1))
      )
    );

    const state = _store.selectSnapshot(WarehouseSelectors.getWarehouses);
    expect(state).toContainEqual(new WarehouseEntity(1, 'Warehouse demo', 1));
  });

  it('should update a warehouse', async () => {
    const updateWarehouseDto: UpdateWarehouseDto = { warehouse_id: 1, name: 'Updated Warehouse', status: 1 };

    await _store.dispatch(new WarehouseActions.Update(updateWarehouseDto)).toPromise();

    const state = _store.selectSnapshot(WarehouseSelectors.getWarehouses);
    expect(state).toContainEqual(new WarehouseEntity(1, 'Updated Warehouse', 1));
  });

  it('should delete a warehouse', async () => {
    await _store.dispatch(new WarehouseActions.Delete(1)).toPromise();

    const state = _store.selectSnapshot(WarehouseSelectors.getWarehouses);
    expect(state).not.toContainEqual(new WarehouseEntity(1, 'Warehouse 1', 1));

  });
});
