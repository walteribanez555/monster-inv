import { inject, Inject, Injectable } from '@angular/core';
import { UserRepository } from '../../../domain/repositories/identity/user.repository';
import { envs } from '../../../config/envs';
import { CreateUserDto } from '../../../domain/dtos/identity/user/create-user.dto';
import { UpdateUserDto } from '../../../domain/dtos/identity/user/update-user.dto';
import { UserEntity } from '../../../domain/entities/identity/user.entity';
import { first, firstValueFrom, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// [
//   {
//       "user_id": 1,
//       "username": "walteribane",
//       "rols": "1,2,3",
//       "hashed_password": "cb062c569cdb9f7695f21e1e8d48189eada182c6cef4957fe7c91e8050ab0f97",
//       "name": "Walter Ibañez",
//       "status": 1,
//       "date_created": "2024-10-03T18:13:25.000Z"
//   }
// ]

export interface UserRequestResponse {
  user_id: number;
  id: number;
  username: string;
  rols: string;
  name: string;
  status: number;
  date_created: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService extends UserRepository {
  private _http = inject(HttpClient);

  constructor(@Inject(envs.AUTH_URL) authUrl: string) {
    super(`${authUrl}/users`);
  }

  override getUser(username: string): Promise<UserEntity> {
    return firstValueFrom(
      this._http
        .get<UserRequestResponse[]>(`${this.identityUrl}?id=${username}`)
        .pipe(
          map((response) => {
            const [err, dto] = UserEntity.fromObject({
              user_id: response[0].user_id,
              username: response[0].username,
              name: response[0].name,
              rols: response[0].rols,
              status: response[0].status,
            });

            if (err) throwError(err);

            return dto as UserEntity;
          })
        )
    );
  }
  override getUsers(): Promise<UserEntity[]> {
    return firstValueFrom(
      this._http.get<UserRequestResponse[]>(`${this.identityUrl}`).pipe(
        map((response) => {

          console.log({response});

          return response.map((user) => {
            const [err, dto] = UserEntity.fromObject({
              user_id: user.user_id,
              username: user.username,
              name: user.name,
              rols: user.rols,
              status: user.status,
            });

            if (err) throwError(err);

            return dto as UserEntity;
          });
        })
      )
    );
  }
  override createUser(dto: CreateUserDto): Promise<UserEntity> {
    return firstValueFrom(
      this._http.post<UserRequestResponse>(`${this.identityUrl}`, dto).pipe(
        map((response) => {

          const [err, entity] = UserEntity.fromObject({
            user_id: response.id ? response.id : response.user_id,
            username: response.username,
            name: response.name,
            rols: response.rols,
            status: response.status,
          });

          if (err) throwError(err);


          return entity as UserEntity;
        })
      )
    );
  }
  override updateUser(dto: UpdateUserDto): Promise<UserEntity> {
    return firstValueFrom(
      this._http
        .put<UserRequestResponse>(`${this.identityUrl}?id=${dto.user_id}`, dto)
        .pipe(
          map((response) => {
            const [err, entity] = UserEntity.fromObject({
              user_id: dto.user_id,
              username: dto.username,
              password: dto.password,
              name: dto.name,
              rols: dto.rols,
              status: dto.status,
            });

            if (err) throwError(err);

            return entity as UserEntity;
          })
        )
    );
  }
  override deleteUser(username: string): Promise<any> {
    return firstValueFrom(
      this._http.delete(`${this.identityUrl}?id=${username}`).pipe(
        map((response) => {
          return response;
        })
      )
    );
  }
}
