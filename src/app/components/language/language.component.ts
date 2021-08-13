import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Language } from 'src/app/models/entities/language';
import { LanguageService } from 'src/app/services/language.service';
import { LanguageAddComponent } from '../language-add/language-add.component';
import { LanguageDeleteComponent } from '../language-delete/language-delete.component';
import { LanguageUpdateComponent } from '../language-update/language-update.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent implements OnInit {
  languages: Language[] = [];
  dataLoaded = false;

  constructor(
    private languageService: LanguageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllLanguages();
  }

  getAllLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
      this.dataLoaded = true;
    });
  }

  openAddModal() {
    var modalReferance = this.modalService.open(LanguageAddComponent, {
      size: 'm',
    });
  }

  openUpdateModal(language: Language) {
    var modalReferance = this.modalService.open(LanguageUpdateComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.language = language;
  }

  openDeleteModal(language: Language) {
    var modalReferance = this.modalService.open(LanguageDeleteComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.language = language;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
