import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { Question } from 'src/app/models/entities/question';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css'],
})
export class TestAddComponent implements OnInit {
  testAddForm: FormGroup;
  questionsArray: FormArray;
  questions: QuestionDetailsDto[] = [];
  optionNumberFilter:number = 0; 

  constructor(
    private testService: TestService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private modalService:NgbModal,
    private activeModal:NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getQuestionDetails();
    this.createQuestionAddForm();
  }

  createQuestionAddForm() {
    this.testAddForm = this.formBuilder.group({
      testName: ['', Validators.required],
      testNotes: ['', Validators.required],
      testTime: [, Validators.required],
      privacy: [false, Validators.required],
      questions: this.formBuilder.array([]),
    });
    this.questionsArray = this.testAddForm.get('questions') as FormArray;
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
    let index=existQuestions.findIndex(q=>q.questionId==question.questionId);
    this.questionsArray.removeAt(index);
  }

  getQuestionDetails() {
    this.questionService.getQuestionDetails().subscribe((response) => {
      this.questions = response.data;
    });
  }

  checkPrivacy(): boolean {
    return this.testAddForm.get('privacy')?.value;
  }

  getOption(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  close() {
    this.activeModal.close('Test add modal closed');
  }

  dismiss() {
    this.activeModal.dismiss('Test add modal dismissed');
  }

  add() {
    if (this.testAddForm.valid) {
      let testModel: TestDetailsDto = Object.assign({}, this.testAddForm.value);

      testModel.mixedCategory = false;
      testModel.userId = this.tokenService.getUserWithJWTFromCookie().id; // if user not exists on jwt, returns user with 'userId:0'
      console.log(testModel);

      this.testService.addWithDetails(testModel).subscribe(
        (response) => {
          this.toastrService.success(
            'Test eklendi',
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

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
