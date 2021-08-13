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
import { Translate } from 'src/app/models/entities/translate';
import { ErrorService } from 'src/app/services/error.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from 'src/app/services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-translate-update',
  templateUrl: './translate-update.component.html',
  styleUrls: ['./translate-update.component.css'],
})
export class TranslateUpdateComponent implements OnInit {
  translateAddForm: FormGroup;
  translate: Translate;
  languages: Language[] = [];

  constructor(
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
    this.createTranslateAddForm();
  }

  getLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
    });
  }

  createTranslateAddForm() {
    this.translateAddForm = this.formBuilder.group({
      id:[this.translate.id],
      key: [this.translate.key, Validators.required],
      languageId: [this.translate.languageId, Validators.required],
      value: [this.translate.value, Validators.required],
    });
  }

  close() {
    this.activeModal.close('Translate Update Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Translate Update Modal Dismissed');
  }

  update() {
    if (this.translateAddForm.valid) {
      let translateModel: Translate = Object.assign(
        {},
        this.translateAddForm.value
      );
      
      translateModel.languageId = +translateModel.languageId;

      console.log(translateModel);
      this.translateService.update(translateModel).subscribe(
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
