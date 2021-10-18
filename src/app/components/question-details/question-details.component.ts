import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/models/entities/option';
import { Question } from 'src/app/models/entities/question';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { ProfileImage } from 'src/app/models/entities/profileImage';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/entities/user';
import { UserService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDetailsDto } from 'src/app/models/dtos/customerDetailsDto';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit {
  questions: QuestionDetailsDto[] = [];
  dataLoaded = false;
  filterText = '';
  optionNumberFilter: number = 0;
  profileImages: ProfileImage[] = [];
  baseUrl = environment.baseUrl;
  customers: CustomerDetailsDto[] = [];
  pageSize: number = 6;
  page: number = 1;
  collectionSize: number = 1;
  categoryId: number = 0;

  constructor(
    private questionService: QuestionService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private profileImageService: ProfileImageService,
    private userService: UserService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getCustomers() {
    this.customerService
      .getAllByUsers(this.questions.map((q) => q.question.userId))
      .subscribe((response) => {
        this.customers = response.data;
      });
  }

  getUrl() {
    return this.router.url;
  }

  setCollectionSize() {
    this.collectionSize = this.questions.length;
  }

  getQuestions() {
    this.questionService.getAllDetailsByPublic().subscribe(
      (response) => {
        this.questions = response.data;
        this.dataLoaded = true;
        this.getProfileImages();
        this.getCustomers();
        this.setCollectionSize();
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getProfileImages() {
    this.profileImageService
      .getAllByUsers(this.questions.map((q) => q.question.userId))
      .subscribe(
        (response) => {
          this.profileImages = response.data;
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
  }

  getCustomer(userId: number): CustomerDetailsDto {
    return this.customers.find((c) => c.customerDetails.userId == userId)!;
  }

  getProfileImage(userId: number): ProfileImage {
    return this.profileImages.find((i) => i.userId == userId)!;
  }

  getOption(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
