import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  inject,
} from '@angular/core';
import { SvgIconComponent, SvgIconRegistryService } from 'angular-svg-icon';
import { DcDirective } from '../../directives/dc.directive';
import { ModalContent } from '../../models/modal-content';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, DcDirective],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() title?: string = 'Agregar Elemento';
  @Input() iconPath?: string = 'assets/icons/heroicons/outline/plus.svg';
  @Input() size: string = 'md';
  @Input() form!: FormGroup | null;
  @Input() data!: any | null;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  @Input() component!: Type<any>;

  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  private cdr = inject(ChangeDetectorRef);

  constructor(private elementRef: ElementRef, private iconRegistry: SvgIconRegistryService) {}

  ngOnInit(): void {}

  close() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit() {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit({ form: this.form, data: this.data });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ModalContent>(
      this.component
    );

    componentRef.instance.form= this.form;
    componentRef.instance.data = this.data;



    // Manually trigger change detection
    this.cdr.detectChanges();
  }
}
