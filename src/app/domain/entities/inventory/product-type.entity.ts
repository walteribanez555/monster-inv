export class ProductTypeEntity {
  constructor(
    public readonly product_type_id: number,
    public readonly name: string,
    public readonly status: string,
    public readonly categories: string,
    public readonly type: number
  ) {}

  public static fromObject(props: { [key: string]: any }) {
    const { product_type_id, name, status, categories, type } = props;

    if (!product_type_id) return ['Product type id required', undefined];
    if (!name) return ['Name required', undefined];
    if (!status) return ['Status required', undefined];
    if (!categories) return ['Categories required', undefined];
    if (!type) return ['Type required', undefined];

    return [
      undefined,
      new ProductTypeEntity(product_type_id, name, status, categories, type),
    ];
  }
}
