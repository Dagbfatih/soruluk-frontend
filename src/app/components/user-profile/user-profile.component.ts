import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { CustomerDetailsDto } from 'src/app/models/dtos/customerDetailsDto';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { ProfileImage } from 'src/app/models/entities/profileImage';
import { User } from 'src/app/models/entities/user';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { QuestionAddComponent } from '../question-add/question-add.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileImage: ProfileImage = {} as ProfileImage;
  baseUrl = environment.baseUrl;
  customer: CustomerDetailsDto = {} as CustomerDetailsDto;
  questions: QuestionDetailsDto[] = [];
  tests: TestDetailsDto[] = [];
  userToken: User;
  currentTab: string = 'user-questions';

  constructor(
    private tokenService: TokenService,
    private profileImageService: ProfileImageService,
    private userService: UserService,
    private errorService: ErrorService,
    private customerService: CustomerService,
    private questionService: QuestionService,
    private testService: TestService,
    private router: Router,
    private ngbNavConfig: NgbNavConfig,
    private modalService: NgbModal
  ) {
    ngbNavConfig.destroyOnHide = false;
    ngbNavConfig.roles = false;
  }

  ngOnInit(): void {
    this.userToken = this.tokenService.getUserWithJWT();
    this.getUserProfileImage();
    this.getCustomerDetails();
    this.getAllQuestionDetails();
    this.getAllTestDetails();
  }

  getAllQuestionDetails() {
    this.questionService
      .getDetailsByUser(this.userToken.id)
      .subscribe((response) => {
        this.questions = response.data;
      });
  }

  getAllTestDetails() {
    this.testService
      .getTestDetailsByUser(this.userToken.id)
      .subscribe((response) => {
        this.tests = response.data;
      });
  }

  getRouterPath(): string {
    return this.router.url;
  }

  openAddQuestionModal() {
    var modalReferance = this.modalService.open(QuestionAddComponent, {
      size: 'xl',
    });
  }

  getCustomerDetails() {
    this.customerService.getDetailsByUser(this.userToken.id).subscribe(
      (response) => {
        this.customer = response.data;
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  isLog(): boolean {
    if (this.tokenService.get() !== null) {
      return true;
    }
    return false;
  }

  getUserProfileImage() {
    this.profileImageService
      .getProfileImageByUser(this.tokenService.getUserWithJWT().id)
      .subscribe((response) => {
        this.profileImage = response.data;
      });
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  getIsConfirmed(): string {
    let roles = this.tokenService.getUserRolesWithJWT();
    if (roles.includes('instructor')) {
      return 'Confirmed';
    }
    return 'Not confirmed (waiting confirmation...)';
  }
}
