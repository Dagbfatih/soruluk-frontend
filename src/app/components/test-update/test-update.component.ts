import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { environment } from 'src/environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-test-update',
  templateUrl: './test-update.component.html',
  styleUrls: ['./test-update.component.css'],
})
export class TestUpdateComponent implements OnInit {
  testUpdateForm: FormGroup = {} as FormGroup;
  questionsArray: FormArray = {} as FormArray;
  questions: QuestionDetailsDto[] = [];
  test: TestDetailsDto;

  constructor(
    private testService: TestService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log(this.test);
    this.createTestUpdateForm();
    this.getQuestionDetails();
  }

  close() {
    this.activeModal.close('Question edit Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Question edit Modal Dismissed');
  }

  createTestUpdateForm() {
    this.testUpdateForm = this.formBuilder.group({
      testId: [this.test.testId],
      testName: [this.test.testName, Validators.required],
      testNotes: [this.test.testNotes, Validators.required],
      testTime: [this.test.testTime, Validators.required],
      privacy: [this.test.privacy, Validators.required],
      questions: this.formBuilder.array(this.getTestQuestions()),
    });
    this.questionsArray = this.testUpdateForm.get('questions') as FormArray;
    console.log(this.questionsArray.controls);
  }

  getTestQuestions(): FormGroup[] {
    let result: FormGroup[] = [];

    this.test.questions.forEach((q) => {
      result.push(
        this.formBuilder.group({
          questionId: [q.questionId, Validators.required],
          questionText: [q.questionText],
          categories: [q.categories],
          options: [q.options],
          starQuestion: [q.starQuestion],
          brokenQuestion: [q.brokenQuestion],
          privacy: [q.privacy],
          userId: [q.userId],
          userName: [q.userName],
        })
      );
    });
    return result;
  }

  createQuestion(question: QuestionDetailsDto): FormGroup {
    return this.formBuilder.group({
      questionId: [question.questionId, Validators.required],
      questionText: [question.questionText],
      categories: [question.categories],
      options: [question.options],
      starQuestion: [question.starQuestion],
      brokenQuestion: [question.brokenQuestion],
      privacy: [question.privacy],
      userId: [question.userId],
      userName: [question.userName],
    });
  }

  addQuestion(question: QuestionDetailsDto) {
    this.questionsArray.push(this.createQuestion(question));
  }

  ifQuestionExists(question: QuestionDetailsDto): boolean {
    let existQuestions: QuestionDetailsDto[] = [];

    for (let i = 0; i < this.questionsArray.length; i++) {
      existQuestions.push(Object.assign({}, this.questionsArray.at(i).value));
    }

    if (existQuestions.map((q) => q.questionId).includes(question.questionId)) {
      return true;
    }
    return false;
  }

  removeQuestion(question: QuestionDetailsDto) {
    let existQuestions: QuestionDetailsDto[] = this.questionsArray.value;
    let index = existQuestions.findIndex(
      (q) => q.questionId == question.questionId
    );
    this.questionsArray.removeAt(index);
  }

  getQuestionDetails() {
    this.questionService.getQuestionDetails().subscribe((response) => {
      this.questions = response.data;
    });
  }

  checkPrivacy(): boolean {
    return this.testUpdateForm.get('privacy')?.value;
  }

  getOption(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  update() {
    if (this.testUpdateForm.valid) {
      let testModel: TestDetailsDto = Object.assign(
        {},
        this.testUpdateForm.value
      );

      testModel.mixedCategory = false;
      testModel.userId = this.tokenService.getUserWithJWTFromCookie().id; // if user not exists on jwt, returns user with 'userId:0'
      testModel.testId = this.test.testId;

      this.testService.updateWithDetails(testModel).subscribe(
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
    } else {
      this.toastrService.warning(
        environment.allFieldsRequired,
        environment.warningMessage
      );
    }
  }

  getTranslate(key: string): string {
    return alltranslates.get(key)!;
  }
}
