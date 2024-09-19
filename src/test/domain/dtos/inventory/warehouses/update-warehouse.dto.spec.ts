import { UpdateWarehouseDto } from '../../../../../app/domain/dtos/inventory/warehouses/update-warehouse.dto';

describe('Update Warehouse DTO ', () => {
  test('Should Create and Update Warehouse DTO', async () => {
    const mockData = {
      warehouse_id: 1,
      name: 'Demo',
      status: 1,
    };

    const warehouseItem = UpdateWarehouseDto.create(mockData)[1];

    expect(warehouseItem).toBeInstanceOf(UpdateWarehouseDto);
  });

  test('Should receive error message on invalid warehouse_id data', async () => {
    const mockData = {
      name: 'Demo',
      status: 1,
    };

    const warehouseItemResponse = UpdateWarehouseDto.create(mockData)[0];

    expect(warehouseItemResponse).toEqual('Warehouse ID Property is Required');
  });


  test('Should receive error message on invalid name data', async () => {
    const mockData = {
      warehouse_id: 1,
      status: 1,
    };

    const warehouseItemResponse = UpdateWarehouseDto.create(mockData)[0];

    expect(warehouseItemResponse).toEqual('Name Property is Required');
  });

  test('Should receive error message on invalid status data', async () => {
    const mockData = {
      warehouse_id: 1,
      name: 'Demo',
    };

    const warehouseItemResponse = UpdateWarehouseDto.create(mockData)[0];

    expect(warehouseItemResponse).toEqual('Status Property is Required');
  });
});


