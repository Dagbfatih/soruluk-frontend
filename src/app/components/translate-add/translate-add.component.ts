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
  selector: 'app-translate-add',
  templateUrl: './translate-add.component.html',
  styleUrls: ['./translate-add.component.css'],
})
export class TranslateAddComponent implements OnInit {
  translateAddForm: FormGroup;
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
      key: ['', Validators.required],
      languageId: [0, Validators.required],
      value: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close('Translate Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Translate Add Modal Dismissed');
  }

  add() {
    if (this.translateAddForm.valid) {
      let translateModel: Translate = Object.assign(
        {},
        this.translateAddForm.value
      );
      console.log(translateModel);
      translateModel.languageId = +translateModel.languageId;
      this.translateService.add(translateModel).subscribe(
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
