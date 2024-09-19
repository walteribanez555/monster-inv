export class InputEntity {
  constructor(
    public readonly input_id: number,
    public readonly product_id: number,
    public readonly provider_id: number,
    public readonly warehouse_id: number,
    public readonly product_type_id: number,
    public readonly quantity: number,
    public readonly detail: string,
    public readonly date_created: string
  ) {}

  public static fromObject(props: { [key: string]: any }) {
    const {
      input_id,
      product_id,
      provider_id,
      warehouse_id,
      product_type_id,
      quantity,
      detail,
      date_created,
    } = props;

    if (!input_id) return ['Input id required', undefined];
    if (!product_id) return ['Product id required', undefined];
    if (!provider_id) return ['Provider id required', undefined];
    if (!warehouse_id) return ['Warehouse id required', undefined];
    if (!product_type_id) return ['Product type id required', undefined];
    if (!quantity) return ['Quantity required', undefined];
    if (!detail) return ['Detail required', undefined];
    if (!date_created) return ['Date created required', undefined];

    return [
      undefined,
      new InputEntity(
        input_id,
        product_id,
        provider_id,
        warehouse_id,
        product_type_id,
        quantity,
        detail,
        date_created
      ),
    ];
  }
}
