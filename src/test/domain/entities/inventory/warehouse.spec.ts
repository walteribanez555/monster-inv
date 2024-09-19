import { WarehouseEntity } from "../../../../app/domain/entities/inventory/warehouse.entity";

describe('Warehouse Entity', () => {
  test("Should Create a WarehouseEntity", async ( ) => {


    const mockData = {
      warehouse_id: 1,
      name: 'Demo',
      status: 1,
    };

    const warehouseItem = WarehouseEntity.fromObject(mockData)[1];

    expect(warehouseItem).toBeInstanceOf(WarehouseEntity);
  });


  test('Should Receive error message on invalid warehouse_id data', async () => {
    const mockData = {
      name: 'Demo',
      status: 1,
    };

    const warehouseItemResponse = WarehouseEntity.fromObject(mockData)[0];

    expect(warehouseItemResponse).toEqual('Warehouse ID Property is Required');
  });

  test('Should Receive error message on invalid status data', async () => {
    const mockData = {
      warehouse_id: 1,
      name: 'Demo',
    };

    const warehouseItemResponse = WarehouseEntity.fromObject(mockData)[0];

    expect(warehouseItemResponse).toEqual('Status Property is Required');
  });

  test('Should Receive error message on invalid name data', async () => {
    const mockData = {
      warehouse_id: 1,
      status: 1,
    };

    const warehouseItemResponse = WarehouseEntity.fromObject(mockData)[0];

    expect(warehouseItemResponse).toEqual('Name Property is Required');
  });

 })
