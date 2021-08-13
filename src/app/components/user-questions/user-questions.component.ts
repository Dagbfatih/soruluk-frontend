import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { Category } from 'src/app/models/entities/category';
import { User } from 'src/app/models/entities/user';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { QuestionService } from 'src/app/services/question.service';
import { TokenService } from 'src/app/services/token.service';
import { QuestionAddComponent } from '../question-add/question-add.component';
import { QuestionDeleteComponent } from '../question-delete/question-delete.component';
import { QuestionUpdateComponent } from '../question-update/question-update.component';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css'],
})
export class UserQuestionsComponent implements OnInit {
  dataLoaded = false;
  questions: QuestionDetailsDto[] = [];
  categories: Category[];
  categoryId: number;
  filterText: string = '';
  user: User = {} as User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private errorService: ErrorService,
    private categoryService: CategoryService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private router: Router,
    private tokenService: TokenService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUserWithJWTFromCookie();
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getDetailsByUserWithCategory(params['categoryId']);
      } else {
        this.getQuestionsByUser();
      }
    });
    this.getCategories();
  }

  getQuestionsByUser() {
    this.questionService.getDetailsByUser(this.user.id).subscribe(
      (response) => {
        this.questions = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getDetailsByUserWithCategory(categoryId: number) {
    if (categoryId==0) {
      this.questionService.getDetailsByUser(this.user.id).subscribe(
        (response) => {
          this.questions = response.data;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }else{
      this.questionService
      .getDetailsByUserWithId(this.user.id, categoryId)
      .subscribe((response) => {
        this.questions = response.data
        this.dataLoaded = true;
      });
    }
  }

  openAddQuestionModal(){
    var modalReferance = this.modalService.open(QuestionAddComponent, {
      size: 'xl',
    });
  }

  openUpdateQuestionModal(questionId: number) {
    var modalReferance = this.modalService.open(QuestionUpdateComponent, {
      size: 'xl',
    });
    modalReferance.componentInstance.question = this.questions.find(
      (q) => q.questionId == questionId
    );
  }

  openDeleteQuestionModal(questionId:number){
    var modalReferance = this.modalService.open(QuestionDeleteComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.question = this.questions.find(
      (q) => q.questionId == questionId
    );
  }

  getUrl() {
    return this.router.url;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  getOption(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  getFilterRouterClass() {
    if (this.categoryId === 0 || !this.categoryId) {
      return '/user/questions';
    } else {
      return '/user/questions/' + this.categoryId;
    }
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
