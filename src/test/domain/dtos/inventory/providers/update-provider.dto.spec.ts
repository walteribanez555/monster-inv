import { UpdateProviderDto } from '../../../../../app/domain/dtos/inventory/providers/update-provider.dto';

describe('Update Provider DTO', () => {
  test('Should create an instance of UpdateProviderDTO', async () => {
    const mockData = {
      provider_id: 1,
      name: 'Provider Name',
      email: 'walteribanez555@gmail.com',
      address: '12343212',
      phone: '1234567890',
      status : 1,
    };

    const [err, dto] = UpdateProviderDto.create(mockData);

    expect(dto).toBeInstanceOf(UpdateProviderDto);
  });

  test('Should Receive an error message on invalid data', async () => {
    const mockData = {
      name: 'Provider Name',
      email: 'walteribanez555@gmail.com',
      address: '12343212',
      phone: '1234567890',
    };

    const [err, dto] = UpdateProviderDto.create(mockData);

    expect(typeof err).toEqual('string');
  });
});
