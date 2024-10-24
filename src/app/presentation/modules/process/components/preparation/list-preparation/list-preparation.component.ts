import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PreparationEntity } from '../../../../../../domain/entities/process/preparation.entity';
import { ItemListPreparationComponent } from '../item-list-preparation/item-list-preparation.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-preparation',
  standalone: true,
  imports: [CommonModule, ItemListPreparationComponent, FormsModule],
  templateUrl: './list-preparation.component.html',
  host : {
    class : 'w-full'
  }
})
export class ListPreparationComponent {
  @Input() preparations!: PreparationEntity[];
  @Output() onItemSelect = new EventEmitter();
  actualPage = 1;
  itemsPerPage = 30;


  initialDate? : string;
  finalDate? : string;

  previousPage() {
    if (this.actualPage > 1) {
      this.actualPage = this.actualPage - 1;
    }

    this.filterEvent();
  }

  nextPage() {
    this.actualPage = this.actualPage + 1;
    this.filterEvent();
  }

  filterEvent() {
    let params;

    if((this.initialDate && !this.finalDate) || (!this.initialDate && this.finalDate)){
      console.log('Fechas requeridas');
      return;
    }

    params = {
      limit: this.itemsPerPage,
      offset: (this.actualPage - 1) * this.itemsPerPage,
      init : this.initialDate,
      end : this.finalDate,
    };

    console.log({params});

    this.onfilterEvent.emit(params);
  }
  @Output() onfilterEvent = new EventEmitter();

  onSelectTable( preparation: PreparationEntity) {
    this.onItemSelect.emit(preparation);
  }
}
