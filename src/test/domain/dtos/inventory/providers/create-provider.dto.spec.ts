import { CreateProviderDto } from "../../../../../app/domain/dtos/inventory/providers/create-provider.dto";

describe('Create Provider DTO', () => {
  test('Should Create a Provider DTO ', async ( ) => {
    const mockData = {
      name: 'Demo',
      status: 1,
      phone : '1234567890',
      email : 'walteribanez555@gmail.com',
      address : 'Calle 123',
    };

    const [err , dto] = CreateProviderDto.create(mockData);

    expect(dto).toBeInstanceOf(CreateProviderDto);

  });


  test('Should Receive error message on Invalid data ', () => {
    const mockData = {
      status : 1,
      phone : '1234567890',
      email : 'walteribanez555@gmail.com',
      address : 'Calle 123',
    }

    const [err , dto] = CreateProviderDto.create(mockData);

    expect(typeof err).toEqual("string");
  })

 })
