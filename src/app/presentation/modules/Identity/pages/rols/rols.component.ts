import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { RolsHeaderComponent } from '../../components/rols/rols-header/rols-header.component';
import { RolFacadeService } from '../../../../../application/facade/identity/RolFacade.service';
import { RolsListComponent } from '../../components/rols/rols-list/rols-list.component';
import { RolEntity } from '../../../../../domain/entities/identity/rol.entity';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { RolFormComponent } from '../../components/rol/rol-form/rol-form.component';
import { Subject, timer } from 'rxjs';
import { StatusAction } from '../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../shared/enum/dialog';
import { Dialog } from '../../../shared/models/dialog';
import { DialogService } from '../../../shared/services/Dialog.service';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';
import { CreateRolDto } from '../../../../../domain/dtos/identity/rol/create-rol.dto';
import { UpdateRolDto } from '../../../../../domain/dtos/identity/rol/update-rol.dto';

@Component({
  selector: 'app-rols',
  standalone: true,
  imports: [CommonModule, RolsHeaderComponent, RolsListComponent, DcDirective],
  templateUrl: './rols.component.html',
})
export class RolsComponent {
  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  private facadeService = inject(RolFacadeService);

  private dialogNotifier = new Subject();
  private dialogService = inject(DialogService);

  private cdr = inject(ChangeDetectorRef);

  rols$ = this.facadeService.rols;
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

  onSelectItemTable(rol: RolEntity) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(RolFormComponent);

    const detailListener: DetailListener<RolEntity> = {
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
          const { name, structure, id, status } = form.value;
          console.log({value : form.value});
          const [error, dto] = UpdateRolDto.create({
            rol_id: id,
            rol_name : name,
            rol_structure : structure,
            status,
          });

          if (error) throw new Error(error as string);

          this.facadeService.update(dto as UpdateRolDto);
        });
      },

      delete: (id) => {},
    };

    componentFactory.instance.rol = rol;
    componentFactory.instance.listener = detailListener;

    this.onShowItem = true;

    this.cdr.detectChanges();

    componentFactory.instance.isOpen = true;
  }

  onAddItem() {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(RolFormComponent);

    const detailListener: DetailListener<RolEntity> = {
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
          const { name, structure } = form.value;
          const [error, dto] = CreateRolDto.create({
            rol_name : name,
            rol_structure : structure,
            status : 1,
          });

          if (error) throw new Error(error as string);

          this.facadeService.create(dto as CreateRolDto);
        });
      },

      delete: (id) => {},
    };

    componentFactory.instance.listener = detailListener;

    this.onShowItem = true;

    this.cdr.detectChanges();

    componentFactory.instance.isOpen = true;
  }


}
