import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Content } from '../../../models/content';
import { ContentsService } from '../../../../../core/services/api/contents.service';
import { ContentItemsTableComponent } from '../content-items-table/content-items-table.component';

@Component({
  selector: 'app-content-table',
  standalone: true,
  imports: [
    CommonModule,
    ContentItemsTableComponent,
  ],
  templateUrl : './content-table.component.html',

})
export class ContentTableComponent implements OnInit {


  public contents: Content[] = [];

  @Output() onSelectItem = new EventEmitter<Content>();

  // private sectionService = inject(SectionService);
  private contentService = inject(ContentsService);

  constructor() {

  }

  ngOnInit(): void {
    // this.sectionService.getSections().subscribe({
    //   next: ( items ) => {
    //     this.activeAuction = items;
    //   },
    //   error : ( err ) => {
    //     console.log(err);
    //   },
    //   complete: ( ) => {

    //   }
    // })

    this.contentService.getContents().subscribe({
        next: ( items ) => {
        this.contents = items;
      },
      error : ( err ) => {
        console.log(err);
      },
      complete: ( ) => {

      }
    })


  }

  onSelectTable( item :Content){
    this.onSelectItem.emit(item);
  }
 }
