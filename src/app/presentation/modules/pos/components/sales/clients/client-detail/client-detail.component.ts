import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './client-detail.component.html',
})
export class ClientDetailComponent {

  close() {

  }
}
