import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  alltranslates,
  TranslateManager,
} from 'src/app/constants/TranslateManager';
import { TranslateDetailsDto } from 'src/app/models/dtos/translateDetailsDto';
import { Translate } from 'src/app/models/entities/translate';
import { TranslateService } from 'src/app/services/translate.service';
import { TranslateAddComponent } from '../translate-add/translate-add.component';
import { TranslateDeleteComponent } from '../translate-delete/translate-delete.component';
import { TranslateUpdateComponent } from '../translate-update/translate-update.component';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent implements OnInit {
  translates: TranslateDetailsDto[] = [];
  dataLoaded = false;
  filterText:string="";

  constructor(
    private translateService: TranslateService,
    private modalService: NgbModal,
    private translateManager: TranslateManager
  ) {}

  ngOnInit(): void {
    this.getAllDetails();
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  getAllDetails() {
    this.translateService.getAllDetails().subscribe((response) => {
      this.translates = response.data;
      this.dataLoaded = true;
    });
  }

  openAddModal() {
    var modalReferance = this.modalService.open(TranslateAddComponent, {
      size: 'm',
    });
  }

  openDeleteModal(translate: TranslateDetailsDto) {
    var modalReferance = this.modalService.open(TranslateDeleteComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.translate = translate.translate;
  }

  openUpdateModal(translate: TranslateDetailsDto) {
    var modalReferance = this.modalService.open(TranslateUpdateComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.translate = translate.translate;
  }
}
