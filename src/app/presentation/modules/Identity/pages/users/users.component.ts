import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { UsersHeaderComponent } from '../../components/users/users-header/users-header.component';
import { UsersListComponent } from '../../components/users/users-list/users-list.component';
import { Subject, timer } from 'rxjs';
import { UserFacadeService } from '../../../../../application/facade/identity/UserFacade.service';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { DialogService } from '../../../shared/services/Dialog.service';
import { StatusAction } from '../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../shared/enum/dialog';
import { Dialog } from '../../../shared/models/dialog';
import { UserEntity } from '../../../../../domain/entities/identity/user.entity';
import { UserFormComponent } from '../../components/users/user-form/user-form.component';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';
import { RolFacadeService } from '../../../../../application/facade/identity/RolFacade.service';
import { CreateUserDto } from '../../../../../domain/dtos/identity/user/create-user.dto';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UsersHeaderComponent, UsersListComponent, DcDirective],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  private facadeService = inject(UserFacadeService);
  private rolFacadeService = inject(RolFacadeService);
  private dialogNotifier = new Subject();
  private dialogService = inject(DialogService);

  private cdr = inject(ChangeDetectorRef);

  users$ = this.facadeService.users;
  rols$ = this.rolFacadeService.rols;
  onLoading$ = this.facadeService.status;

  onShowItem = false;

  constructor() {
    effect(() => {
      switch (this.onLoading$()) {
        case StatusAction.LOADING:
          const dialog: Dialog = {
            typeDialog: DialogType.isLoading,
            listener: this.dialogNotifier,
            data: {
              title: 'Cargando',
              description: 'Espere un momento por favor',
              icon: 'assets/icons/loading.svg',
            },
            options: {
              withActions: false,
              withBackground: true,
              position: [DialogPosition.center],
              colorIcon: 'text-primary',
            },
          };

          this.dialogService.open(dialog);
          break;
        case StatusAction.SUCCESS:
          this.dialogNotifier.next(null);
          //Show Success dialog
          const dialogSuccess: Dialog = {
            typeDialog: DialogType.isSuccess,
            data: {
              title: 'Operacion Exitosa',
              description: 'La operacion se ha completado con exito',
              icon: 'assets/icons/heroicons/outline/check-badge.svg',
            },
            options: {
              withBackground: false,
              position: [DialogPosition.top, DialogPosition.right],
              colorIcon: 'text-green-500',
              timeToShow: timer(2000),
            },
          };

          this.dialogService.open(dialogSuccess);

          break;

        case StatusAction.INITIAL:
          this.dialogNotifier.next(null);
          break;

        default:
          this.dialogNotifier.next(null);
      }
    });
  }

  onAddEvent() {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory =
      viewContainerRef.createComponent(UserFormComponent);

    const detailListener: DetailListener<UserEntity> = {
      close: () => {
        this.dcWrapper.viewContainerRef.clear();
        this.onShowItem = false;
      },
      cancel: () => {
        this.dcWrapper.viewContainerRef.clear();
        this.onShowItem = false;
      },
      submit: (form) => {
        this.dcWrapper.viewContainerRef.clear();
        this.onShowItem = false;

        const dialog = {
          typeDialog: DialogType.isAlert,
          data: {
            title: 'Advertencia',
            description: 'Estas seguro de realizar esta accion',
            icon: 'assets/icons/heroicons/outline/exclamation.svg',
          },
          options: {
            withActions: true,
            position: [DialogPosition.center],
            withBackground: true,
            colorIcon: 'text-red-500',
          },
        };

        this.dialogService.open(dialog).subscribe((resp) => {

          console.log({form : form.value});
          const { username, password, confirm, status, name, roles} = form.value;
          const [error, dto] = CreateUserDto.create({
            username,
            password,
            confirm,
            status,
            name,
            roles,
          });

          if (error) throw new Error(error as string);

          this.facadeService.create(dto as CreateUserDto);
        });



      },
      delete: (id) => {},
    };

    componentFactory.instance.rols = this.rols$();
    componentFactory.instance.detailListener = detailListener;
    this.onShowItem = true;

    this.cdr.detectChanges();
    componentFactory.instance.isOpen = true;
  }

  onSelectUser(user: UserEntity) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory =
      viewContainerRef.createComponent(UserFormComponent);

    const detailListener: DetailListener<UserEntity> = {
      close: () => {
        this.dcWrapper.viewContainerRef.clear();
        this.onShowItem = false;
      },
      cancel: () => {
        this.dcWrapper.viewContainerRef.clear();
        this.onShowItem = false;
      },
      submit: (form) => {},
      delete: (id) => {},
    };


    componentFactory.instance.rols = this.rols$();
    componentFactory.instance.userEntity = user;
    componentFactory.instance.detailListener = detailListener;
    this.onShowItem = true;

    this.cdr.detectChanges();
    componentFactory.instance.isOpen = true;
  }
}
