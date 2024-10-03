import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, Output, ViewChild } from '@angular/core';
import { OutputsHeaderComponent } from '../../../components/warehouses/outputs/outputs-header/outputs-header.component';
import { ModalOutputsComponent } from '../../../components/warehouses/outputs/modal-outputs/modal-outputs.component';
import { ListOutputsComponent } from '../../../components/warehouses/outputs/list-outputs/list-outputs.component';
import { WarehouseService } from '../../../../../core/services/api/inventory/warehouse.service';
import { Warehouse } from '../../../models/warehouses/warehouse.model';
import { OutputService } from '../../../../../core/services/api/inventory/output.service';
import { OutputProduct } from '../../../models/outputs/outputs.model';
import { OutputDetailComponent } from '../../../components/warehouses/outputs/output-detail/output-detail.component';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { ModalService } from '../../../../shared/services/Modal.service';
import { OutputDetailListener } from '../../../interfaces/OutputDetailListener';
import { ActionType } from '../../../../shared/enum/action';
import { OutputFacadeService } from '../../../../../../application/facade/inventory/OutputFacade.service';
import { WarehouseFacadeService } from '../../../../../../application/facade/inventory/WarehouseFacade.service';
import { ProductTypeFacadeService } from '../../../../../../application/facade/inventory/ProductTypeFacade.service';
import { DialogService } from '../../../../shared/services/Dialog.service';
import { Subject, timer } from 'rxjs';
import { StatusAction } from '../../../../../../application/enums/Status.enum';
import { DialogType, DialogPosition } from '../../../../shared/enum/dialog';
import { Dialog } from '../../../../shared/models/dialog';
import { OutputEntity } from '../../../../../../domain/entities/inventory/output.entity';
import { FormControl } from '@angular/forms';
import { InputSelectComponent } from '../../../../shared/components/form-inputs/input-select/input-select.component';
import { InputTextComponent } from '../../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../../shared/components/form-template/form-template.component';
import { DynamicForm } from '../../../../shared/types/dynamic.types';
import { responseModalFormMapper } from '../../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { InputDateComponent } from '../../../../shared/components/form-inputs/input-date/input-date.component';

@Component({
  selector: 'app-outputs',
  standalone: true,
  imports: [
    CommonModule,
    OutputsHeaderComponent,
    ListOutputsComponent,
    DcDirective,
  ],
  providers: [ModalService],
  templateUrl: './outputs.component.html',
})
export class OutputsComponent implements OnInit {
  @ViewChild(DcDirective) dcWrapper!: DcDirective;

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

  ngOnInit(): void {

  }

  private modalService = inject(ModalService);
  private OutputFacadeService = inject(OutputFacadeService);
  private warehouseFacadeService = inject(WarehouseFacadeService);
  private productTypeFacadeService = inject(ProductTypeFacadeService);

  private dialogService = inject(DialogService);

  warehouses$ = this.warehouseFacadeService.warehouses;
  outputs$ = this.OutputFacadeService.outputs;
  productTypes$ = this.productTypeFacadeService.productTypes;
  onLoading$ = this.OutputFacadeService.statusAction;


  onShowItem = false;
  private dialogNotifier = new Subject();



  outputDetailListener: OutputDetailListener = {
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

  onItemSelected(outputProduct: OutputEntity) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      OutputDetailComponent
    );
    componentFactory.instance.outputdetailListener = this.outputDetailListener;
    componentFactory.instance.outputProduct = outputProduct;

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
            items : this.warehouses$().map((warehouse) => {
              return {
                id: warehouse.warehouse_id,
                name: warehouse.name,
              };
            })
          },
          fieldFormControl: new FormControl(''),
        },

        {
          component: InputSelectComponent,
          data: {
            title: 'Producto',
            items : this.productTypes$().map((productType) => {
              return {
                id: productType.product_type_id,
                name: productType.name,
              };
            })
          },
          fieldFormControl: new FormControl(''),
        },
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



    this.modalService.open(ModalOutputsComponent, {
      title: `Ingresar tus api keys`,
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
    }).subscribe({
      next: (resp) => {
        const {Almacen, Cantidad, Detalle, Producto} = responseModalFormMapper(resp);


        this.OutputFacadeService.addItem(Producto, Almacen, Detalle,Cantidad);

      },
      error: (err) => {
        console.log({ err });
      },
      complete: () => {
        console.log('Complete');
      },
    })
  }

  onFilterEvents(params: { [key: string]: any }) {
    this.OutputFacadeService.getItems(params);
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
      .open(ModalOutputsComponent, {
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

          this.OutputFacadeService.createReport(params);
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
