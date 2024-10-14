import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Identificacion',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Usuarios',
          route: '/identity/users',
        },
        {
          icon: 'assets/icons/heroicons/outline/shield.svg',
          label: 'Roles',
          route: '/identity/rols',
        },
      ],
    },
    {
      group: 'Inventario',
      separator: true,
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
            {
              icon: 'assets/icons/heroicons/outline/document-arrow-down.svg',
              label: 'Producto por almacen',
              route: '/warehouse/products-warehouse',
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
            // {
            //   icon: 'assets/icons/heroicons/outline/tag.svg',
            //   label: 'Categorias',
            //   route: '/warehouse/categories',
            // },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/truck.svg',
          label: 'Proveedores',
          route: '/warehouse/providers',
        },
      ],
    },
    {
      group: 'Produccion',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/clip.svg',
          label: 'Preparaciones',
          route: '/process/preparation',
        },
        {
          icon: 'assets/icons/heroicons/outline/pencil-square.svg',
          label: 'Recetas',
          route: '/process/recipes',
        },
      ],
    },
  ];
}
