import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/models/entities/option';
import { Question } from 'src/app/models/entities/question';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { QuestionService } from 'src/app/services/question.service';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { ProfileImage } from 'src/app/models/entities/ProfileImage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit {
  questions: QuestionDetailsDto[] = [];
  categories: Category[] = [];
  dataLoaded = false;
  filterText = '';
  optionNumberFilter: number = 0;
  profileImages: ProfileImage[] = [];
  baseUrl = environment.baseUrl;

  categoryId: number = 0;

  constructor(
    private questionService: QuestionService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private profileImageService: ProfileImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getQuestionsByCategory(params['categoryId']);
      } else {
        this.getQuestions();
      }
    });
    this.getCategories();
  }

  getUrl() {
    return this.router.url;
  }

  getQuestions() {
    this.questionService.getAllDetailsByPublic().subscribe(
      (response) => {
        this.questions = response.data;
        this.dataLoaded = true;
        this.getProfileImages();
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getProfileImages() {
    this.profileImageService
      .getAllByUsers(this.questions.map((q) => q.userId))
      .subscribe(
        (response) => {
          this.profileImages = response.data;
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
  }

  getProfileImage(userId: number): ProfileImage {
    return this.profileImages.find((i) => i.userId == userId)!;
  }

  getQuestionsByCategory(categoryId: number) {
    this.questionService
      .getDetailsByCategory(categoryId)
      .subscribe((response) => {
        this.questions = response.data;
        this.dataLoaded = true;
      });
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
      return '/questions/details';
    } else {
      return '/questions/details/' + this.categoryId;
    }
  }
  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
