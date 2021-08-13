import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Language } from 'src/app/models/entities/language';
import { ErrorService } from 'src/app/services/error.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language-update',
  templateUrl: './language-update.component.html',
  styleUrls: ['./language-update.component.css'],
})
export class LanguageUpdateComponent implements OnInit {
  languageUpdateForm: FormGroup;
  language: Language;

  constructor(
    private languageService: LanguageService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createLanguageAddForm();
  }

  createLanguageAddForm() {
    this.languageUpdateForm = this.formBuilder.group({
      languageName: [this.language.languageName, Validators.required],
      code: [this.language.code, Validators.required],
      id: [this.language.id],
    });
  }

  close() {
    this.activeModal.close('Language Update Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Language Update Modal Dismissed');
  }

  update() {
    if (this.languageUpdateForm.valid) {
      let languageModel: Language = Object.assign(
        {},
        this.languageUpdateForm.value
      );
      
      this.languageService.update(languageModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
