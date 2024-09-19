import { CreateWarehouseDto } from '../../../../../app/domain/dtos/inventory/warehouses/create-warehouse.dto';

describe('Create Warehouse DTO', () => {
  test('Should Create a warrehouse DTO', async () => {
    const mockData = {
      name: 'Demo',
      status: 1,
    };

    const warehouseItem = CreateWarehouseDto.create(mockData)[1];

    expect(warehouseItem).toBeInstanceOf(CreateWarehouseDto);
  });

  test('Should Receive error message on invalid status data', async () => {
    const mockData = {
      name: 'Demo',
    };

    const warehouseItemResponse = CreateWarehouseDto.create(mockData)[0];

    expect(warehouseItemResponse).toEqual('Status Property is Required');
  });

  test('Should Receive error message on invalid name data', async () => {
    const mockData = {
      status: 1,
    };

    const warehouseItemResponse = CreateWarehouseDto.create(mockData)[0];

    expect(warehouseItemResponse).toEqual('Name Property is Required');
  });
});
