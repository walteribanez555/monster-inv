export class ProductEntity {
  constructor(
    public readonly product_id: number,
    public readonly warehouse_id: number,
    public readonly product_type_id: number,
    public readonly quantity: number,
    public readonly price: number,
    public readonly discount: number,
    public readonly date_created: string
  ) {}

  public static fromObject(props: { [key: string]: any }) {
    const {
      product_id,
      warehouse_id,
      product_type_id,
      quantity,
      price,
      date_created,
      discount,
    } = props;

    if (!product_id) return ['product_id is required', undefined];

    if (!warehouse_id) return ['warehouse_id is required', undefined];

    if (!product_type_id) return ['product_type_id is required', undefined];

    if (quantity == null || quantity== undefined ) return ['quantity is required', undefined];

    if (price == null || price ==undefined) return ['price is required', undefined];

    if (discount == null || discount == undefined) return ['discount is required', undefined];

    if (!date_created) return ['date_created is required', undefined];

    return [
      undefined,
      new ProductEntity(
        product_id,
        warehouse_id,
        product_type_id,
        quantity,
        price,
        discount,
        date_created
      ),
    ];
  }
}
