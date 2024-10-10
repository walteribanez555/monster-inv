//Make a function to get string between '/'  to get routes

import { SubMenuItem } from "../core/models/menu.model";

export function getRoutes(structure: string): string[] {
  // Split the structure into lines
  const lines = structure.split('/');

  // Remove leading and trailing whitespace from each line
  const trimmedLines = lines.map(line => line.trim());

  // Remove empty lines
  const nonEmptyLines = trimmedLines.filter(line => line.length > 0);

  const routes = nonEmptyLines.map(line => {
    const route = line.split(' ')[1];
    return route;
  });

  return routes;
}


export function verifyRoute(route: string, validRoutes: string[][]) {
  const isValid = validRoutes.some((validRoute) => {
    const routeArray = route.split('/').filter((s) => s);
    return routeArray.every(
      (r, i) => r === validRoute[i] || validRoute[i] === '*'
    );
  });


  return isValid;
}

export function   getRoutesFromMenuItem(
  item: SubMenuItem,
  validRoutes: string[][]
): SubMenuItem | null {
  if (item.route) {
    return verifyRoute(item.route, validRoutes) ? item : null;
  } else {
    const childrenAux = item.children
      ?.map((c) => getRoutesFromMenuItem(c, validRoutes))
      .filter((c) => c !== null) as SubMenuItem[];
    return childrenAux.length ?  {
      ...item,
      children : childrenAux
    } : null;
  }
}
