import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { WarehousesHeaderComponent } from '../../../components/warehouses/warehouses/warehouses-header/warehouses-header.component';
import { ModalWarehousesComponent } from '../../../components/warehouses/warehouses/modal-warehouses/modal-warehouses.component';
import { ListWarehousesComponent } from '../../../components/warehouses/warehouses/list-warehouses/list-warehouses.component';
import { Warehouse } from '../../../models/warehouses/warehouse.model';
import { ModalService } from '../../../../shared/services/Modal.service';
import { ActionType } from '../../../../shared/enum/action';
import { FormControl } from '@angular/forms';
import { FormTemplateComponent } from '../../../../shared/components/form-template/form-template.component';
import { DynamicForm } from '../../../../shared/types/dynamic.types';
import { responseModalFormMapper } from '../../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { InputTextComponent } from '../../../../shared/components/form-inputs/input-text/input-text.component';
import { DialogService } from '../../../../shared/services/Dialog.service';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { WarehouseDetailComponent } from '../../../components/warehouses/warehouses/warehouse-detail/warehouse-detail.component';
import { WarehouseFacadeService } from '../../../../../../application/facade/WarehouseFacade.service';
import { Subject, timer } from 'rxjs';
import { StatusAction } from '../../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../../shared/enum/dialog';
import { Dialog } from '../../../../shared/models/dialog';
import { WarehouseEntity } from '../../../../../../domain/entities/inventory/warehouse.entity';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    CommonModule,
    WarehousesHeaderComponent,
    ListWarehousesComponent,
    DcDirective,
  ],
  templateUrl: './warehouses.component.html',
})
export class WarehousesComponent implements OnInit {
  ngOnInit(): void {}

  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private warehouseFacadeService = inject(WarehouseFacadeService);

  warehouses$ = this.warehouseFacadeService.warehouses;
  onLoading$ = this.warehouseFacadeService.statusAction;
  private dialogNotifier = new Subject();

  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  onShowItem: boolean = false;

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
    const keyForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Detalles del nuevo almacen a agregar',
        description: 'Especificaciones necesarias del almacen a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: 'Almacen 1',
            title: 'Almacen',
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService
      .open(ModalWarehousesComponent, {
        title: `Agregar Almacen`,
        size: 'sm',
        forms: [keyForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Ingresar',
          },
        ],
      })
      .subscribe({
        next: (resp) => {
          const formResponse = responseModalFormMapper(resp);
          // console.log({value : formResponse.Almacen});
          const warehouseName = formResponse.Almacen;
          // const { warehouseName } = formResponse['almacen'];
          console.log({ warehouseName });

          const newWarehouse: Warehouse = {
            name: warehouseName,
            status: 1,
          };

          this.createWareHouse(newWarehouse);
        },
        error: (err) => {
          console.log({ err });
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }

  createWareHouse(newWarehouse: Warehouse) {
    this.warehouseFacadeService.addItem(newWarehouse.name, newWarehouse.status);
  }

  detailListener: DetailListener<WarehouseEntity> = {
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
        const { warehouse_id, name, status } = form.value;

        this.warehouseFacadeService.updateItem(warehouse_id, name, status);
      });
    },

    delete: (id) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      const dialog: Dialog = {
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
        this.warehouseFacadeService.deleteItem(id as number);
      });
    },
  };

  onEditEvent(warehouse: WarehouseEntity) {

    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componetFactory = viewContainerRef.createComponent(
      WarehouseDetailComponent
    );

    componetFactory.instance.detailListener = this.detailListener;
    componetFactory.instance.warehouse = warehouse;

    this.onShowItem = true;
  }
}
