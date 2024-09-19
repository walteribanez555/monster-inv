import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../shared/models/modal-content';
import { ActionModalListener } from '../../../../shared/interfaces/ActionModalListener';
import { DynamicForm } from '../../../../shared/types/dynamic.types';

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './notification-form.component.html',
})
export class NotificationFormComponent implements ModalContent, AfterViewInit {
  @Input() forms!: DynamicForm[] | null;
  actionsModal?: ActionModalListener | undefined;
  onCreateModal?: EventEmitter<any> | undefined;
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  form: FormGroup | null = null;


  @Input() data!: any;



}
