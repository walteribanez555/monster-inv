import { EnvironmentProviders, InjectionToken, Provider } from "@angular/core"
import { environment } from "../../environments/environment";

export class envs{

  public static BASE_URL = new InjectionToken<string>('BASE_URL');
  public static AUTH_URL = new InjectionToken<string>('AUTH_URL');





  public static envProviders : EnvironmentProviders[] | Provider[] = [
    {
      provide: envs.BASE_URL,
      useValue: environment.api_url,
    },
    {
      provide : envs.AUTH_URL,
      useValue : environment.identity_url
    }
  ]

}
