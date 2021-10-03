import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { QuestionService } from 'src/app/services/question.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import {
  FormArray,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { OptionService } from 'src/app/services/option.service';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Lesson } from 'src/app/models/entities/lesson';
import { Subject } from 'src/app/models/entities/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { LessonService } from 'src/app/services/lesson.service';
import { Option } from 'src/app/models/entities/option';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css'],
})
export class QuestionUpdateComponent implements OnInit {
  questionAddForm: FormGroup;
  optionsArray: FormArray;
  categoriesArray: FormArray;
  accuracyIndex: number;
  question: QuestionDetailsDto;
  lessons: Lesson[] = [];
  subjects: Subject[] = [];
  subjectDataLoaded = false;
  difficultyWidth: string = 'width:50%;';

  constructor(
    private activeModal: NgbActiveModal,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private optionNumberGeneratorService: OptionNumberGeneratorService,
    private errorService: ErrorService,
    private tokenService: TokenService,
    private router: Router,
    private subjectService: SubjectService,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.createQuestionUpdateForm();
    this.getAllLessons();
    this.getOptionChecked();
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

  close() {
    this.activeModal.close('Question edit Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Question edit Modal Dismissed');
  }

  getDifficultyLevel(): number {
    return this.questionAddForm.get('difficultyLevel')?.value;
  }

  setStarQuestion() {
    this.question.question.starQuestion = !this.question.question.starQuestion;
    this.questionAddForm
      .get('starQuestion')
      ?.setValue(this.question.question.starQuestion);
  }

  checkPrivacy(): boolean {
    return this.questionAddForm.get('privacy')?.value;
  }

  createQuestionUpdateForm() {
    this.questionAddForm = this.formBuilder.group({
      questionId: [this.question.question.questionId],
      userId: [this.question.question.userId],
      questionText: [this.getQuestionText()],
      options: this.formBuilder.array(this.getQuestionOptions()),
      starQuestion: [this.getStarQuestion()],
      difficultyLevel: [2],
      privacy: [this.getQuestionPrivacy()],
    });
    this.questionAddForm
      .get('starQuestion')
      ?.setValue(this.question.question.starQuestion);
    this.optionsArray = this.questionAddForm.get('options') as FormArray;
    this.categoriesArray = this.questionAddForm.get('categories') as FormArray;
    this.getOptionChecked();
  }

  getOptions(): FormArray {
    return this.questionAddForm.get('options') as FormArray;
  }

  difficultySelected(difficultyLevel: number) {
    this.questionAddForm.get('difficultyLevel')?.setValue(difficultyLevel);
    if (difficultyLevel == 0) {
      this.difficultyWidth = 'width:' + 6 + '%;';
    } else if (difficultyLevel == 1) {
      this.difficultyWidth = 'width:' + 30 + '%;';
    } else if (difficultyLevel == 2) {
      this.difficultyWidth = 'width:' + 52 + '%;';
    } else if (difficultyLevel == 3) {
      this.difficultyWidth = 'width:' + 74 + '%;';
    } else {
      this.difficultyWidth = 'width:' + 100 + '%;';
    }
  }

  createOption(): FormGroup {
    console.log(this.question);
    return this.formBuilder.group({
      optionId: [0, Validators.required],
      optionText: ['', Validators.required],
      accuracy: [''],
    });
  }

  createCategory(): FormGroup {
    return this.formBuilder.group({
      categoryId: [0, Validators.required],
    });
  }

  getOptionChecked() {
    let options: Option[] = this.getQuestionOptions().map((o) => o.value);
    this.accuracyIndex = options.find((o) => o.accuracy)?.id!;
  }

  getQuestionOptions(): FormGroup[] {
    let result: FormGroup[] = [];

    this.question.options.forEach((o) => {
      result.push(
        this.formBuilder.group({
          optionId: [o.id, Validators.required],
          optionText: [o.optionText, Validators.required],
          accuracy: [o.accuracy],
        })
      );
    });

    return result;
  }

  getQuestionText(): string {
    return this.question.question.questionText;
  }

  getStarQuestion(): boolean {
    return this.question.question.starQuestion;
  }

  getQuestionPrivacy(): boolean {
    return this.question.question.privacy;
  }

  addOption() {
    this.optionsArray.push(this.createOption());
  }

  addCategory() {
    this.categoriesArray.push(this.createCategory());
  }

  removeOption(index: number) {
    this.optionsArray.removeAt(index);
  }

  removeCategory(index: number) {
    this.categoriesArray.removeAt(index);
  }

  update() {
    if (this.questionAddForm.valid) {
      let questionModel: QuestionDetailsDto = Object.assign(
        {},
        this.questionAddForm.value
      );
      questionModel.question = Object.assign({}, this.questionAddForm.value);
      this.setOptionAccuracies();
      questionModel.question.questionId = this.question.question.questionId;
      questionModel.question.userId = this.question.question.userId;
      

      this.questionService.updateWithDetails(questionModel).subscribe(
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

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
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
