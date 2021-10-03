import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import {
  FormArray,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { ErrorService } from 'src/app/services/error.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';
import { TokenService } from 'src/app/services/token.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { BranchService } from 'src/app/services/branch.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/entities/customer';
import { Lesson } from 'src/app/models/entities/lesson';
import { LessonService } from 'src/app/services/lesson.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/models/entities/subject';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css'],
})
export class QuestionAddComponent implements OnInit {
  questionAddForm: FormGroup;
  optionsArray: FormArray;
  accuracyIndex: number;
  starQuestion: boolean = false;
  customer: Customer;
  lessons: Lesson[] = [];
  subjects: Subject[] = [];
  subjectDataLoaded = false;
  difficultyWidth: string = 'width:50%;';

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private optionNumberGeneratorService: OptionNumberGeneratorService,
    private errorService: ErrorService,
    private tokenService: TokenService,
    private activeModal: NgbActiveModal,
    private customerService: CustomerService,
    private lessonService: LessonService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.getAllLessons();
    this.createQuestionAddForm();
    this.getCustomer();
  }

  getAllSubjects(lessonId: number) {
    this.subjectDataLoaded = false;
    this.subjectService.getAllByLesson(lessonId).subscribe((response) => {
      this.subjects = response.data;
      this.subjectDataLoaded = true;
    });
  }

  getAllLessons() {
    this.lessonService.getAll().subscribe((response) => {
      this.lessons = response.data;
    });
  }

  setStarQuestion() {
    this.starQuestion = !this.starQuestion;
    this.questionAddForm.get('starQuestion')?.setValue(this.starQuestion);
  }

  close() {
    this.activeModal.close('Question add modal closed');
  }

  dismiss() {
    this.activeModal.dismiss('Question add modal dismissed');
  }

  checkLessonIdValue(): number {
    return this.questionAddForm.get('lessonId')?.value;
  }

  checkPrivacy(): boolean {
    return this.questionAddForm.get('privacy')?.value;
  }

  createQuestionAddForm() {
    this.questionAddForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      options: this.formBuilder.array([
        this.createOption(),
        this.createOption(),
      ]),
      starQuestion: [''],
      privacy: [true],
      difficultyLevel: [2, Validators.required],
      lessonId: [0, Validators.required],
      subjectId: [0, Validators.required],
    });
    this.questionAddForm.get('starQuestion')?.setValue(this.starQuestion);
    this.optionsArray = this.questionAddForm.get('options') as FormArray;
  }

  getOptions(): FormArray {
    return this.questionAddForm.get('options') as FormArray;
  }

  getDifficultyLevel(): number {
    return this.questionAddForm.get('difficultyLevel')?.value;
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      optionText: ['', Validators.required],
      accuracy: [''],
    });
  }

  createCategory(): FormGroup {
    return this.formBuilder.group({
      categoryId: [0, Validators.required],
    });
  }

  addOption() {
    this.optionsArray.push(this.createOption());
  }

  removeOption(index: number) {
    this.optionsArray.removeAt(index);
  }

  getCustomer() {
    this.customerService
      .getByUser(this.tokenService.getUserWithJWT()?.id)
      .subscribe((response) => {
        this.customer = response.data;
      });
  }

  add() {
    if (this.questionAddForm.valid) {
      let questionModel: QuestionDetailsDto = Object.assign(
        {},
        this.questionAddForm.value
      );
      questionModel.question = Object.assign({}, this.questionAddForm.value);

      this.setOptionAccuracies();
      questionModel.question.userId = this.tokenService.getUserWithJWT()?.id;
      questionModel.question.lessonId = this.customer.lessonId;
      questionModel.question.lessonId = +questionModel.question.lessonId;
      questionModel.question.subjectId = +questionModel.question.subjectId;

      console.log(questionModel);

      this.questionService.addWithDetails(questionModel).subscribe(
        (response) => {
          this.toastrService.success('Eklendi', environment.successMessage);
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

  getOptionNumberClass(index: number): string {
    return this.optionNumberGeneratorService.getOptionNumber(index);
  }

  setOptionAccuracies() {
    for (let i = 0; i < this.optionsArray.length; i++) {
      if (i == this.accuracyIndex) {
        this.optionsArray.at(i).value.accuracy = true;
      } else {
        this.optionsArray.at(i).value.accuracy = false;
      }
    }
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
