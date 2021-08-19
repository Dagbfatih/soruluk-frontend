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
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';
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

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css'],
})
export class QuestionAddComponent implements OnInit {
  questionAddForm: FormGroup;
  optionsArray: FormArray;
  categoriesArray: FormArray;
  accuracyIndex: number;
  categories: Category[] = [];
  starQuestion: boolean = false;
  customer: Customer;

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private optionNumberGeneratorService: OptionNumberGeneratorService,
    private errorService: ErrorService,
    private tokenService: TokenService,
    private activeModal: NgbActiveModal,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.createQuestionAddForm();
    this.getCustomer();
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

  checkPrivacy(): boolean {
    return this.questionAddForm.get('privacy')?.value;
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  createQuestionAddForm() {
    this.questionAddForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      options: this.formBuilder.array([
        this.createOption(),
        this.createOption(),
      ]),
      categories: this.formBuilder.array([this.createCategory()]),
      starQuestion: [''],
      privacy: [false],
    });
    this.questionAddForm.get('starQuestion')?.setValue(this.starQuestion);
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

  addCategory() {
    this.categoriesArray.push(this.createCategory());
  }

  removeOption(index: number) {
    this.optionsArray.removeAt(index);
  }

  removeCategory(index: number) {
    this.categoriesArray.removeAt(index);
  }

  getCustomer() {
    this.customerService
      .getByUser(this.tokenService.getUserWithJWTFromCookie()?.id)
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

      this.setCategoryIds(questionModel);
      this.setOptionAccuracies();
      questionModel.userId = this.tokenService.getUserWithJWTFromCookie()?.id;
      questionModel.branchId = this.customer.branchId;
      
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
