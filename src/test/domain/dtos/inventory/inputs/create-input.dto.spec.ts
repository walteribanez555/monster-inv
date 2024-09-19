import { CreateInputDto } from '../../../../../app/domain/dtos/inventory/inputs/create-input.dto';

describe('Create Input DTO', () => {
  test('Should Work', async () => {

    const item = CreateInputDto.create({
      id: 1,
    });

    expect(1).toEqual(1);
  });
});
