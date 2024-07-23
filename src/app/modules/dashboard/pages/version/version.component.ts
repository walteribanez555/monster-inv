import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Version } from '../../models/version';
import { VersionsService } from '../../../../core/services/api/versions.service';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../shared/services/Modal.service';
import { VersionFormComponent } from '../../components/version/version-form/version-form.component';

@Component({
  selector: 'app-version',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './version.component.html',
})
export class VersionComponent implements OnInit {
  ngOnInit(): void {
    this.versionsService.getVersions().subscribe({
      next: (items) => {
        this.versions = items;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  versionForm = new FormGroup({});

  private versionsService = inject(VersionsService);

  versions: Version[] = [
    {
      id: 1,
      ver: 1,
    },
  ];

  private modalService = inject(ModalService);

  addVersion() {
    this.modalService
      .open(VersionFormComponent, {
        title: 'Agregar Version',
        size: 'md',
        form: this.versionForm,
        icon: 'assets/icons/heroicons/outline/plus.svg',
      })
      .subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Finalizado');
        },
      });
  }
}
