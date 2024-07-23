import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Content } from '../../../models/content';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: '[content-table-item]',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl : './content-items-table.component.html',

})
export class ContentItemsTableComponent {

  @Input() content! : Content;
  @Output() toggleItem = new EventEmitter();


  constructor() {}

  ngOnInit(): void {

  }


  onToggleItem () {
    this.toggleItem.emit(this.content);
  }

 }
