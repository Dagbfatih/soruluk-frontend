import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { Test } from 'src/app/models/entities/test';
import { ErrorService } from 'src/app/services/error.service';
import { PageService } from 'src/app/services/page.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-delete',
  templateUrl: './test-delete.component.html',
  styleUrls: ['./test-delete.component.css'],
})
export class TestDeleteComponent implements OnInit {
  public test:TestDetailsDto;

  constructor(
    private activeModal: NgbActiveModal,
    private testService: TestService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private pageService: PageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Test edit Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Test edit Modal Dismissed');
  }

  delete() {
    this.testService.deleteWithDetails(this.test).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          environment.successMessage
        );
        this.pageService.reloadPage(this.router.url);
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
