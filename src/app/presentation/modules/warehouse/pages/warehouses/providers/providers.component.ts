import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { ProvidersHeaderComponent } from '../../../components/warehouses/providers/providers-header/providers-header.component';
import { ListProvidersComponent } from '../../../components/warehouses/providers/list-providers/list-providers.component';
import { ProviderService } from '../../../../../core/services/api/inventory/provider.service';
import { ProviderProduct } from '../../../models/providers/ProviderProduct';
import { ModalService } from '../../../../shared/services/Modal.service';
import { FormControl } from '@angular/forms';
import { FormTemplateComponent } from '../../../../shared/components/form-template/form-template.component';
import { DynamicForm } from '../../../../shared/types/dynamic.types';
import { ModalWarehousesComponent } from '../../../components/warehouses/warehouses/modal-warehouses/modal-warehouses.component';
import { ActionType } from '../../../../shared/enum/action';
import { responseModalFormMapper } from '../../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { InputTextComponent } from '../../../../shared/components/form-inputs/input-text/input-text.component';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { DialogType, DialogPosition } from '../../../../shared/enum/dialog';
import { Dialog } from '../../../../shared/models/dialog';
import { DialogService } from '../../../../shared/services/Dialog.service';
import { ProvidersDetailComponent } from '../../../components/warehouses/providers/providers-detail/providers-detail.component';
import { ProviderFacadeService } from '../../../../../../application/facade/ProviderFacade.service';
import { ProviderEntity } from '../../../../../../domain/entities/inventory/provider.entity';
import { StatusAction } from '../../../../../../application/enums/Status.enum';
import { Subject, timer } from 'rxjs';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [
    CommonModule,
    ProvidersHeaderComponent,
    ListProvidersComponent,
    DcDirective,
  ],
  templateUrl : './providers.component.html',
})
export class ProvidersComponent implements OnInit {

  @ViewChild(DcDirective) dcWrapper! : DcDirective;


  ngOnInit(): void {
  }

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


  private modalService  = inject(ModalService);
  private dialogService = inject(DialogService);
  private providerFacadeService = inject(ProviderFacadeService);


  providers$ : Signal<ProviderEntity[]> = this.providerFacadeService.providers;
  onLoading$ : Signal<StatusAction> = this.providerFacadeService.statusAction;

  private dialogNotifier = new Subject();




  detailListener : DetailListener<ProviderEntity> = {
    close  : () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

    },
    cancel :  () => {

      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

    },
    submit : ( form ) => {

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

      this.dialogService.open(dialog).subscribe((resp ) =>  {
        const { provider_id, name, phone, email, address, status } = form.value;

        this.providerFacadeService.updateItem(provider_id, name, phone, email, address, status);
      })



    },
    delete : ( id ) => {

      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      const dialog : Dialog  = {
        typeDialog : DialogType.isAlert,
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
      }

      this.dialogService.open(dialog).subscribe((resp) => {
        this.providerFacadeService.deleteItem(id as number);
      })

    }
  };



  onAddProvider() {

    const providerForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Detalles del nuevo proveedor',
        description: 'Especificaciones necesarias del proveedor a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: 'Nombre del proveedor',
            title: 'Proveedor',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component : InputTextComponent,
          data : {
            placeholder:  '78140498',
            title : 'Telefono',
          },
          fieldFormControl : new FormControl('')
        },
        {
          component : InputTextComponent,
          data : {
            placeholder : 'monster@gmail.com',
            title : 'Email',
          },
          fieldFormControl : new FormControl('')
        },
        {
          component : InputTextComponent,
          data : {
            placeholder : 'Av. 123',
            title : 'Direccion',
          },
          fieldFormControl : new FormControl('')
        },
      ],
    };


    this.modalService.open(ModalWarehousesComponent,  {
      title: `Agregar Almacen`,
      size: 'sm',
      forms: [providerForm],
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Ingresar',
        },
      ],
    } ).subscribe({
      next : ( resp ) => {
        const formResponse = responseModalFormMapper(resp);

        const providerName = formResponse.Proveedor;
        const providerPhone = formResponse.Telefono;
        const providerEmail = formResponse.Email;
        const providerAddress = formResponse.Direccion;

        const newProvider : ProviderProduct = {
          name : providerName,
          phone : providerPhone,
          email : providerEmail,
          address : providerAddress,
          status : 1,
          date : new Date().toISOString().split('T')[0],
        };


        this.providerFacadeService.addItem(providerName, providerPhone, providerEmail, providerAddress,1);



        // alert(JSON.stringify(formResponse));
      },
      error :  ( err ) => {

      },
      complete : ( ) => {

      }
    })
  }



  onSelectProvider( provider : ProviderEntity) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory = viewContainerRef.createComponent(ProvidersDetailComponent);
    componentFactory.instance.detailListener = this.detailListener;
    componentFactory.instance.provider = provider;



    this.onShowItem = true;
  }


}
