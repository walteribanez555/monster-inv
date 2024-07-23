import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Usuarios',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Usuarios',
          route: '/user/users',
        },
        {
          icon: 'assets/icons/heroicons/outline/shield.svg',
          label: 'Roles',
          route: '/user/rols',
        },
      ],
    },
    {
      group: 'Inventario',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/storage.svg',
          label: 'Almacenes',
          children: [
            {
              icon: 'assets/icons/heroicons/outline/storage.svg',
              label: 'Listado de almacenes',
              route: '/warehouse/warehouses',
            },
            {
              icon: 'assets/icons/heroicons/outline/document-arrow-up.svg',
              label: 'Entradas',
              route: '/warehouse/inputs',
            },
            {
              icon: 'assets/icons/heroicons/outline/document-arrow-down.svg',
              label: 'Salidas',
              route: '/warehouse/outputs',
            },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/clipboard.svg',
          label: 'Productos',
          children: [
            {
              icon: 'assets/icons/heroicons/outline/clipboard.svg',
              label: 'Listado de Productos',
              route: '/warehouse/products',
            },
            {
              icon: 'assets/icons/heroicons/outline/price.svg',
              label: 'descuentos',
              route: '/warehouse/discounts',
            },
            {
              icon: 'assets/icons/heroicons/outline/tag.svg',
              label: 'Categorias',
              route: '/warehouse/categories',
            },
          ],
        },
      ],
    },
    {
      group: 'Pos',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/building.svg',
          label: 'Sucursales',
          route: '/pos/branches',
        },

        {
          icon: 'assets/icons/heroicons/outline/money.svg',
          label: 'Ventas',
          children: [
            {
              icon: 'assets/icons/heroicons/outline/money.svg',
              label: 'Ventas',
              route: '/pos/sales',
            },
            {
              icon: 'assets/icons/heroicons/outline/tv.svg',
              label: 'Cajas',
              route: '/pos/cashiers',
            },
            {
              icon: 'assets/icons/heroicons/outline/user-group.svg',
              label: 'Clientes',
              route: '/pos/clients',
            },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/truck.svg',
          label: 'pedidos',
          route: '/pos/orders',
        },
      ],
    },
  ];
}
