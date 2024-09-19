import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import {
  ResponseWarehouseRequest,
  WarehousesService,
} from '../../../app/infraestructure/api/warehouses.service';
import { envs } from '../../../app/config/envs';

describe('WarehousesService', () => {
  let warehousesService: WarehousesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WarehousesService,
        {
          provide: envs.BASE_URL,
          useValue: environment.api_url,
        },
      ],
    });

    warehousesService = TestBed.inject(WarehousesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should return a list of warehouses', async () => {
    const mockWarehouses: ResponseWarehouseRequest[] = [
      { warehouse_id: 1, name: 'Warehouse 1', status: 1 },
      { warehouse_id: 2, name: 'Warehouse 2', status: 1 },
    ];

    let warehouses: ResponseWarehouseRequest[] | undefined;

    // Call the service method
    const promise = warehousesService
      .getAll()
      .then((response: ResponseWarehouseRequest[]) => {
        warehouses = response;
      });

    // Mock the HTTP request
    const req = httpTestingController.expectOne(
      `${environment.api_url}/warehouses`
    );

    // Respond with mock data
    req.flush(mockWarehouses);

    // Wait for the promise to resolve
    await promise;

    // Assert the result
    expect(warehouses).toEqual(mockWarehouses);
  });

  it('Should return a warehouse', async () => {
    const mockWarehouse: ResponseWarehouseRequest[] = [
      {
        warehouse_id: 1,
        name: 'Warehouse 1',
        status: 1,
      },
    ];

    let warehouse: ResponseWarehouseRequest[] | undefined;

    const promise = warehousesService
      .get(1)
      .then((response: ResponseWarehouseRequest[]) => {
        warehouse = response;
      });

    const req = httpTestingController.expectOne(
      `${environment.api_url}/warehouses?id=1`
    );

    req.flush(mockWarehouse);

    await promise;

    expect(warehouse).toEqual(mockWarehouse);
  });

  it('Should create a warehouse', async () => {
    const mockWarehouse: ResponseWarehouseRequest = {
      warehouse_id: 1,
      name: 'Warehouse 1',
      status: 1,
    };

    let warehouse: ResponseWarehouseRequest | undefined;

    const promise = warehousesService
      .create({ name: 'Warehouse 1', status: 1 })
      .then((response: ResponseWarehouseRequest) => {
        warehouse = response;
      });

    const req = httpTestingController.expectOne(
      `${environment.api_url}/warehouses`
    );

    req.flush(mockWarehouse);

    await promise;

    expect(warehouse).toEqual(mockWarehouse);
  });

  it('Should update a warehouse', async () => {
    const mockWarehouse: ResponseWarehouseRequest = {
      warehouse_id: 1,
      name: 'Warehouse 1',
      status: 1,
    };

    let warehouse: ResponseWarehouseRequest | undefined;

    const promise = warehousesService
      .update({ warehouse_id: 1, name: 'Warehouse 1', status: 1 })
      .then((response: ResponseWarehouseRequest) => {
        warehouse = response;
      });

    const req = httpTestingController.expectOne(
      `${environment.api_url}/warehouses?id=1`
    );

    req.flush(mockWarehouse);

    await promise;

    expect(warehouse).toEqual(mockWarehouse);
  });

  it('Should delete a warehouse', async () => {
    const mockWarehouse: ResponseWarehouseRequest = {
      warehouse_id: 1,
      name: 'Warehouse 1',
      status: 1,
    };



    const promise = warehousesService
      .delete(1)
      .then((response: any) => {


      });

    const req = httpTestingController.expectOne(
      `${environment.api_url}/warehouses?id=1`
    );

    req.flush(mockWarehouse);

    await promise;

    expect(req.request.method).toBe('DELETE');

    expect(req.request.url).toBe(`${environment.api_url}/warehouses?id=1`);


  });

});
