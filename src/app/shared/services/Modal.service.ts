import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private modalNotifier? : Subject<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(component: Type<any>, options?: { size?: string; title: string , form : FormGroup | null, data : any  , icon : string}) {
    const modalComponentFactory =
      this.resolver.resolveComponentFactory(ModalComponent);

    const modalComponentRef = modalComponentFactory.create(this.injector);
    const modalComponent = modalComponentRef.instance;

    modalComponent.title = options?.title;
    modalComponent.size = options?.size || 'md';
    modalComponent.form = options!.form;
    modalComponent.data = options!.data;
    modalComponent.iconPath = options?.icon || 'assets/icons/heroicons/outline/plus.svg';


    // Create the provided component dynamically
    const contentComponentFactory = this.resolver.resolveComponentFactory(component);
    const contentComponentRef = contentComponentFactory.create(this.injector);

    // Attach the dynamically created component to the modal component's view
    modalComponent.component = component;
    // Subscribe to modal events
    modalComponent.closeEvent.subscribe(() => {
      this.closeModal();
    });

    modalComponent.submitEvent.subscribe(( content : any) => {
      this.submitModal(content);
    });

    // Detect changes and append the modal to the body
    modalComponentRef.hostView.detectChanges();
    this.document.body.appendChild(modalComponentRef.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal( content : any) {
    this.modalNotifier?.next(content);
    this.closeModal();

  }

}
