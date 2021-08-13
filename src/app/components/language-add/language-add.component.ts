import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Language } from 'src/app/models/entities/language';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-language-add',
  templateUrl: './language-add.component.html',
  styleUrls: ['./language-add.component.css'],
})
export class LanguageAddComponent implements OnInit {
  languageAddForm: FormGroup;

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
    this.languageAddForm = this.formBuilder.group({
      languageName: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close('Language Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Language Add Modal Dismissed');
  }

  add() {
    if (this.languageAddForm.valid) {
      let languageModel: Language = Object.assign(
        {},
        this.languageAddForm.value
      );

      this.languageService.add(languageModel).subscribe(
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
