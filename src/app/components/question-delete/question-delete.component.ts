import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { Question } from 'src/app/models/entities/question';
import { ErrorService } from 'src/app/services/error.service';
import { PageService } from 'src/app/services/page.service';
import { QuestionService } from 'src/app/services/question.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.css'],
})
export class QuestionDeleteComponent implements OnInit {
  public question: QuestionDetailsDto;

  constructor(
    private activeModal: NgbActiveModal,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private pageService: PageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Question edit Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Question edit Modal Dismissed');
  }

  delete() {
    let deletedQuestion: Question = {
      questionId: this.question.questionId,
      brokenQuestion: this.question.brokenQuestion,
      privacy: this.question.privacy,
      questionText: this.question.questionText,
      starQuestion: this.question.starQuestion,
      userId: this.question.userId,
      branchId: this.question.branchId,
    };

    this.questionService.delete(deletedQuestion).subscribe(
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
