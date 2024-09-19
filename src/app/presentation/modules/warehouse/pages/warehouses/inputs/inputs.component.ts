import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { InputsHeaderComponent } from '../../../components/warehouses/inputs/inputs-header/inputs-header.component';
import { ModalInputsComponent } from '../../../components/warehouses/inputs/modal-inputs/modal-inputs.component';
import { ListInputsComponent } from '../../../components/warehouses/inputs/list-inputs/list-inputs.component';
import { InputService } from '../../../../../core/services/api/inventory/input.service';
import { InputProduct } from '../../../models/inputs/inputs.model';
import { InputDetailComponent } from '../../../components/warehouses/inputs/input-detail/input-detail.component';
import { InputDetailListener } from '../../../interfaces/InputDetailListener';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { ModalService } from '../../../../shared/services/Modal.service';
import { ActionType } from '../../../../shared/enum/action';
import { WarehouseFacadeService } from '../../../../../../application/facade/WarehouseFacade.service';
import { InputFacadeService } from '../../../../../../application/facade/InputFacade.service';
import { InputEntity } from '../../../../../../domain/entities/inventory/input.entity';
import { Subject, timer } from 'rxjs';
import { StatusAction } from '../../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../../shared/enum/dialog';
import { Dialog } from '../../../../shared/models/dialog';
import { DialogService } from '../../../../shared/services/Dialog.service';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../../shared/components/form-template/form-template.component';
import { DynamicForm } from '../../../../shared/types/dynamic.types';
import { InputSelectComponent } from '../../../../shared/components/form-inputs/input-select/input-select.component';
import { ProductTypeFacadeService } from '../../../../../../application/facade/ProductTypeFacade.service';
import { responseModalFormMapper } from '../../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { Warehouse } from '../../../models/warehouses/warehouse.model';
import { CreateInputDto } from '../../../../../../domain/dtos/inventory/inputs/create-input.dto';
import { ProviderFacadeService } from '../../../../../../application/facade/ProviderFacade.service';
import { InputDateComponent } from '../../../../shared/components/form-inputs/input-date/input-date.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
    InputsHeaderComponent,
    ListInputsComponent,
    DcDirective,
  ],
  templateUrl: './inputs.component.html',
})
export class InputsComponent implements OnInit {
  private modalService = inject(ModalService);

  private warehouseFacadeService = inject(WarehouseFacadeService);
  private inputFacadeService = inject(InputFacadeService);
  private productTypeFacadeService = inject(ProductTypeFacadeService);
  private providerFacadeService = inject(ProviderFacadeService);

  private dialogService = inject(DialogService);

  warehouses$ = this.warehouseFacadeService.warehouses;
  inputs$ = this.inputFacadeService.inputs;
  productTypes$ = this.productTypeFacadeService.productTypes;
  providers$ = this.providerFacadeService.providers;

  onLoading$ = this.inputFacadeService.statusAction;
  private dialogNotifier = new Subject();

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

  onShowItem = false;

  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  ngOnInit(): void {}

  inputDetailListener: InputDetailListener = {
    close: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    submit: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    cancel: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
  };

  onInputSelected(input: InputEntity) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory =
      viewContainerRef.createComponent(InputDetailComponent);
    componentFactory.instance.inputDetailListener = this.inputDetailListener;
    componentFactory.instance.inputProduct = input;

    this.onShowItem = true;
  }

  onAddEvent() {
    const keyForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Detalles de la entrada',
        description: 'Especificaciones necesarias de la entrada a agregar',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            title: 'Almacen',
            items: this.warehouses$().map((warehouse) => {
              return {
                id: warehouse.warehouse_id,
                name: warehouse.name,
              };
            }),
          },
          fieldFormControl: new FormControl(''),
        },

        {
          component: InputSelectComponent,
          data: {
            title: 'Producto',
            items: this.productTypes$().map((productType) => {
              return {
                id: productType.product_type_id,
                name: productType.name,
              };
            }),
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Proveedor',
            items: this.providers$().map((provider) => {
              return {
                id: provider.provider_id,
                name: provider.name,
              };
            }),
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };
    const secondForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Detalles de la entrada',
        description: 'Especificaciones necesarias de la entrada a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: 'Detalle',
            title: 'Detalle',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            placeholder: 'Cantidad',
            title: 'Cantidad',
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService
      .open(ModalInputsComponent, {
        title: `Agregar Entrada`,
        size: 'sm',
        forms: [keyForm, secondForm],
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
          const { Almacen, Cantidad, Detalle, Producto, Proveedor } =
            responseModalFormMapper(resp);

          this.inputFacadeService.addItem(
            Producto,
            Proveedor,
            Almacen,
            Detalle,
            Cantidad
          );
        },
        error: (err) => {
          console.log({ err });
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }

  onFilterEvents(params: { [key: string]: any }) {
    this.inputFacadeService.getItems(params);
  }

  onGenerateReport() {
    const reportForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Parametros de Reporte',
        description: 'Filtros necesarios para generar el reporte',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            title: 'Almacen',
            items: this.warehouses$().map((warehouse) => {
              return {
                id: warehouse.warehouse_id,
                name: warehouse.name,
              };
            }),
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Producto',
            items: this.productTypes$().map((productType) => {
              return {
                id: productType.product_type_id,
                name: productType.name,
              };
            }),
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputDateComponent,
          data: {
            title: 'Inicio',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputDateComponent,
          data: {
            title: 'Fin',
          },
          fieldFormControl: new FormControl(),
        },
      ],
    };

    this.modalService
      .open(ModalInputsComponent, {
        title: `Generar Reporte`,
        size: 'sm',
        forms: [reportForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Generar',
          },
        ],
      })
      .subscribe({
        next: (resp) => {
          const response = responseModalFormMapper(resp);

          const responseMapped: any = {
            warehouse_id: response.Almacen,
            product_type_id: response.Producto,
            init: response.Inicio,
            end: response.Fin,
          };

          const params = Object.keys(responseMapped).reduce(
            (acc: any, key: string) => {
              if (
                responseMapped[key] !== null &&
                responseMapped[key] !== undefined
              ) {
                acc[key] = responseMapped[key];
              }
              return acc;
            },
            {}
          );

          this.inputFacadeService.createReport(params);
        },
        error: (err) => {
          console.log({ err });
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }
}
