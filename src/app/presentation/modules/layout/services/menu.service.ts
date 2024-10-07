import {
  effect,
  inject,
  Injectable,
  OnDestroy,
  Signal,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from '../../../core/constants/menu';
import { MenuItem, SubMenuItem } from '../../../core/models/menu.model';
import { AuthFacadeService } from '../../../../application/facade/auth/AuthFacade.service';
import { CredentialEntity } from '../../../../domain/entities/auth/credential.entity';
import { cleanStructure } from '../../../utils/json.utils';
import { getRoutes, getRoutesFromMenuItem } from '../../../utils/routes.utils';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebar = signal(true);
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<MenuItem[]>([]);
  private _subscription = new Subscription();
  private authFacadeService = inject(AuthFacadeService);

  private credentials$: Signal<CredentialEntity | null> =
    this.authFacadeService.credential;

  constructor(private router: Router) {
    effect(
      () => {
        const credential = this.credentials$();
        if (!credential) return;

        const items = credential.rols.split('~').map((rol) => JSON.parse(rol));
        const rules = items.map((item) =>
          JSON.parse(cleanStructure(item.rol_structure))
        );

        const appRules = rules.map((r) => r.apps);

        const validRoutes: string[][] = [];

        appRules.forEach((rule) => {
          rule.forEach((ruleItem: any) => {
            ruleItem.pages.forEach((page: string) => {
              validRoutes.push(page.split('/'));
            });
          });
        });

        const filteredPages = Menu.pages.filter((page) => {
          page.items = page.items.filter((item) => {
            return getRoutesFromMenuItem(item, validRoutes);
          });
          return page.items.length > 0;
        });

        /** Set dynamic menu */
        this._pagesMenu.set(filteredPages);

        let sub = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            /** Expand menu based on active route */
            this._pagesMenu().forEach((menu) => {
              let activeGroup = false;
              menu.items.forEach((subMenu) => {
                const active = this.isActive(subMenu.route);
                subMenu.expanded = active;
                subMenu.active = active;
                if (active) activeGroup = true;
                if (subMenu.children) {
                  this.expand(subMenu.children);
                }
              });
              menu.active = activeGroup;
            });
          }
        });
        this._subscription.add(sub);
      },
      { allowSignalWrites: true }
    );

    /** Set dynamic menu */
    this._pagesMenu.set(Menu.pages);

    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /** Expand menu based on active route */
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription.add(sub);
  }

  get showSideBar() {
    return this._showSidebar();
  }
  get showMobileMenu() {
    return this._showMobileMenu();
  }
  get pagesMenu() {
    return this._pagesMenu();
  }

  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }
  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  public toggleSidebar() {
    this._showSidebar.set(!this._showSidebar());
  }

  public toggleMenu(menu: any) {
    this.showSideBar = true;
    menu.expanded = !menu.expanded;
  }

  public toggleSubMenu(submenu: SubMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);
      if (item.children) this.expand(item.children);
    });
  }

  private isActive(instruction: any): boolean {
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }




}
