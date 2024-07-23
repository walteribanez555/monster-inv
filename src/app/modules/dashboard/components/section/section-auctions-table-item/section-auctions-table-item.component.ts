import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Nft } from '../../../models/nft';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Section } from '../../../models/section';

@Component({
  selector: '[section-auctions-table-item]',
  standalone: true,
  imports: [
    AngularSvgIconModule, CurrencyPipe
  ],
  templateUrl : './section-auctions-table-item.component.html',
})
export class SectionAuctionsTableItemComponent {
  @Input() auction = <Section>{};
  @Output() onToggleItem = new EventEmitter<Section>();

  constructor() {}

  ngOnInit(): void {

  }


  toggleItem () {
    this.onToggleItem.emit(this.auction);
  }

 }


