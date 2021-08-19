import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { QuestionResultDetailsDto } from 'src/app/models/dtos/questionResultDetailsDto';
import { TestResultDetailsDto } from 'src/app/models/dtos/testResultDetailsDto';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user-result-details',
  templateUrl: './user-result-details.component.html',
  styleUrls: ['./user-result-details.component.css'],
})
export class UserResultDetailsComponent implements OnInit {
  testResult: TestResultDetailsDto = {} as TestResultDetailsDto;
  questionOrder: number = 0;
  dataLoaded = true;

  constructor(
    private testResultService: TestResultService,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  getTestResultDetails() {
    this.testResultService
      .getDetailsById(this.testResult.resultDetails.id!)
      .subscribe((response) => {
        this.testResult = response.data;
      });
  }

  close() {
    this.activeModal.close('Result Details Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Result Details Modal Dismissed');
  }

  getQuestion(): QuestionDetailsDto {
    return this.testResult.questionResults[this.questionOrder].question;
  }

  previousQuestion() {
    if (this.questionOrder == 0) {
      return;
    } else {
      this.questionOrder--;
    }
  }

  nextQuestion() {
    if (this.questionOrder == this.testResult.questionResults.length - 1) {
      return;
    } else {
      this.questionOrder++;
    }
  }

  getCheckedClass(i: number, j: number = -1): boolean {
    if (j == -1) {
      return this.testResult.questionResults[i].selectedOptionId == 0
        ? true
        : false;
    }

    if (
      this.testResult.questionResults[i].selectedOptionId ===
      this.testResult.questionResults[i].question.options[j].id
    ) {
      return true;
    } else {
      return false;
    }
  }

  getQuestionResult(questionId: number): QuestionResultDetailsDto {
    return this.testResult.questionResults.find(
      (q) => q.questionId == questionId
    )!;
  }

  getIsEmpty(questionId: number): boolean {
    let questionResult = this.getQuestionResult(questionId);

    if (questionResult.selectedOptionId === 0) {
      return true;
    }
    return false;
  }

  getIsCorrect(questionId: number, optionId: number): boolean {
    return this.getQuestionResult(questionId).correctOptionId == optionId;
  }

  getIsInCorrect(questionId: number): boolean {
    let questionResult = this.getQuestionResult(questionId);

    if (questionResult.accuracy && questionResult.selectedOptionId !== 0) {
      return true;
    }
    return false;
  }

  getOptionNumber(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
