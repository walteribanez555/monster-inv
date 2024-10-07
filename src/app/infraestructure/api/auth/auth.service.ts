import { Inject, inject, Injectable } from '@angular/core';
import { AuthRepository } from '../../../domain/repositories/auth/auth.repository';
import { LoginDto } from '../../../domain/dtos/auth/login.dto';
import { LogoutDto } from '../../../domain/dtos/auth/logout.dto';
import { CredentialEntity } from '../../../domain/entities/auth/credential.entity';
import { HttpClient } from '@angular/common/http';
import { envs } from '../../../config/envs';
import { firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthRepository {

  private _http = inject(HttpClient);

  constructor(@Inject(envs.AUTH_URL) authUrl : string) {
    super(`${authUrl}/sessions`);
  }

  override login(dto: LoginDto): Promise<CredentialEntity> {
    return firstValueFrom(
      this._http.post<any>(`${this.authUrl}`,dto).pipe(
        map((resp) => {
            const [ err , dto ] = CredentialEntity.fromObject({...resp});

            if(err) throwError(err);

            return dto as CredentialEntity

        })
      )
    )
  }



  override logout(): Promise<any> {
    return firstValueFrom(
      this._http.delete(`${this.authUrl}`).pipe(
        map((resp) => {
          return resp;
        })
      )
    )
  }



}
