import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';
import { AppRoutingModule } from './app/presentation/app-routing.module';
import { AppComponent } from './app/presentation/app.component';
import { provideStore } from '@ngxs/store';
import { WarehouseRepository } from './app/domain/repositories/inventory/warehouse.repository';
import { WarehousesService } from './app/infraestructure/api/warehouses.service';
import { envs } from './app/config/envs';
import { WarehouseState } from './app/application/states/warehouse/warehouse.state';
import { ProviderRepository } from './app/domain/repositories/inventory/provider.repository';
import { ProvidersService } from './app/infraestructure/api/providers.service';
import { ProviderState } from './app/application/states/provider/provider.state';
import { ProductTypeRepository } from './app/domain/repositories/inventory/product-type.repository';
import { ProductTypeService } from './app/infraestructure/api/product-type.service';
import { ProductTypeState } from './app/application/states/product-type/product-type.state';
import { InputRepository } from './app/domain/repositories/inventory/input.repository';
import { InputsService } from './app/infraestructure/api/inputs.service';
import { InputState } from './app/application/states/input/input.state';
import { OutputRepository } from './app/domain/repositories/inventory/output.repository';
import { OutputsService } from './app/infraestructure/api/outputs.service';
import { OutputState } from './app/application/states/output/output.state';
import { ProductState } from './app/application/states/product/product.state';
import { ProductRepository } from './app/domain/repositories/inventory/product.repository';
import { ProductsService } from './app/infraestructure/api/products.service';
if (environment.production) {
  enableProdMode();
  //show this warning only on prod mode
  if (window) {
    selfXSSWarning();
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideAnimations(),
    provideHttpClient(),
    provideStore([
      WarehouseState,
      ProviderState,
      ProductTypeState,
      InputState,
      OutputState,
      ProductState,
    ]),
    ...[envs.envProviders],
    {
      provide: WarehouseRepository,
      useClass: WarehousesService,
    },
    {
      provide: ProviderRepository,
      useClass: ProvidersService,
    },
    {
      provide: ProductTypeRepository,
      useClass: ProductTypeService,
    },
    {
      provide: InputRepository,
      useClass: InputsService,
    },
    {
      provide: OutputRepository,
      useClass: OutputsService,
    },
    {
      provide: ProductRepository,
      useClass : ProductsService
    }
  ],
}).catch((err) => console.error(err));

function selfXSSWarning() {
  setTimeout(() => {
    console.log(
      '%c** STOP **',
      'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding-left: 15px; padding-right: 15px; border-radius: 25px; padding-top: 5px; padding-bottom: 5px;'
    );
    console.log(
      `\n%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information sing an attack called Self-XSS. Do not enter or paste code that you do not understand.`,
      'font-weight:bold; font: 2em Arial; color: #e11d48;'
    );
  });
}
