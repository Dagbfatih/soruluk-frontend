import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Language } from 'src/app/models/entities/language';
import { ErrorService } from 'src/app/services/error.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language-delete',
  templateUrl: './language-delete.component.html',
  styleUrls: ['./language-delete.component.css'],
})
export class LanguageDeleteComponent implements OnInit {
  language: Language;

  constructor(
    private activeModal: NgbActiveModal,
    private languageService: LanguageService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Language Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Language Delete Modal Dismissed');
  }

  delete() {
    this.languageService.delete(this.language).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          environment.successMessage
        );
        this.close();
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }
  
  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
