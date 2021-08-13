import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
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
} from '@angular/forms';
import { Category } from 'src/app/models/entities/category';
import { OptionService } from 'src/app/services/option.service';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { alltranslates } from 'src/app/constants/TranslateManager';

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
  categories: Category[] = [];
  public question: QuestionDetailsDto;

  constructor(
    private activeModal: NgbActiveModal,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private optionNumberGeneratorService: OptionNumberGeneratorService,
    private errorService: ErrorService,
    private tokenService: TokenService,
    private optionService: OptionService,
    private router: Router,
    private pageService:PageService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.createQuestionUpdateForm();
  }

  close() {
    this.activeModal.close('Question edit Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Question edit Modal Dismissed');
  }

  setStarQuestion() {
    this.question.starQuestion = !this.question.starQuestion;
    this.questionAddForm
      .get('starQuestion')
      ?.setValue(this.question.starQuestion);
  }

  checkPrivacy(): boolean {
    return this.questionAddForm.get('privacy')?.value;
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  createQuestionUpdateForm() {
    this.questionAddForm = this.formBuilder.group({
      questionId: [this.question.questionId],
      userId: [this.question.userId],
      questionText: [this.getQuestionText(), Validators.required],
      options: this.formBuilder.array(this.getQuestionOptions()),
      categories: this.formBuilder.array(this.getQuestionCategories()),
      starQuestion: [this.getStarQuestion()],
      privacy: [this.getQuestionPrivacy()],
    });
    this.questionAddForm
      .get('starQuestion')
      ?.setValue(this.question.starQuestion);
    this.optionsArray = this.questionAddForm.get('options') as FormArray;
    this.categoriesArray = this.questionAddForm.get('categories') as FormArray;
  }

  getOptions(): FormArray {
    return this.questionAddForm.get('options') as FormArray;
  }

  getCategories(): FormArray {
    return this.questionAddForm.get('categories') as FormArray;
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

  getQuestionCategories(): FormGroup[] {
    let result: FormGroup[] = [];

    this.question.categories.forEach((c) => {
      result.push(
        this.formBuilder.group({
          categoryId: [c.categoryId, Validators.required],
        })
      );
    });
    return result;
  }

  getQuestionText(): string {
    return this.question.questionText;
  }

  getStarQuestion(): boolean {
    return this.question.starQuestion;
  }

  getQuestionPrivacy(): boolean {
    return this.question.privacy;
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
      let questionModel = Object.assign({}, this.questionAddForm.value);
      this.setCategoryIds(questionModel);
      this.setOptionAccuracies();
      questionModel.questionId = this.question.questionId;
      questionModel.userId = this.question.userId;

      this.questionService.updateWithDetails(questionModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
          this.pageService.reloadPage(this.router.url);
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

  setCategoryIds(model: any) {
    model.categories.map((c: any) => (c.categoryId = +c.categoryId));
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
