import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Nft } from '../../../models/nft';
import { NftAuctionsTableItemComponent } from '../../nft/nft-auctions-table-item/nft-auctions-table-item.component';
import { SectionAuctionsTableItemComponent } from '../section-auctions-table-item/section-auctions-table-item.component';
import { Section } from '../../../models/section';
import { SectionService } from '../../../../../core/services/api/section.service';

@Component({
  selector: 'app-section-items-table',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    SectionAuctionsTableItemComponent,
  ],
  templateUrl : './section-items-table.component.html'
})
export class SectionItemsTableComponent implements OnInit {

  public activeAuction: Section[] = [];

  private sectionService = inject(SectionService);

  @Output() onSelectItem = new EventEmitter<Section>();

  constructor() {

  }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe({
      next: ( items ) => {
        this.activeAuction = items;
      },
      error : ( err ) => {
        console.log(err);
      },
      complete: ( ) => {

      }
    })
  }


  onEditTable( item :Section){
    this.onSelectItem.emit(item);
  }

 }
