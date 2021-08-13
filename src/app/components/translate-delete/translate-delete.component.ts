import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Translate } from 'src/app/models/entities/translate';
import { ErrorService } from 'src/app/services/error.service';
import { TranslateService } from 'src/app/services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-translate-delete',
  templateUrl: './translate-delete.component.html',
  styleUrls: ['./translate-delete.component.css'],
})
export class TranslateDeleteComponent implements OnInit {
  translate: Translate;

  constructor(
    private activeModal: NgbActiveModal,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Translate Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Translate Delete Modal Dismissed');
  }

  delete() {
    this.translateService.delete(this.translate).subscribe(
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
