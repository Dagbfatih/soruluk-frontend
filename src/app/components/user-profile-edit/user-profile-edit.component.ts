import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
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
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
})

export class UserProfileEditComponent implements OnInit {
  profileImage: ProfileImage = {} as ProfileImage;
  baseUrl = environment.baseUrl;
  questions: QuestionDetailsDto[] = [];
  tests: TestDetailsDto[] = [];
  userToken: User;
  selectedFile: ImageSnippet;
  currentTab: string = 'user-questions';
  profileUpdateForm: FormGroup = {} as FormGroup;
  profileImageUpdateForm: FormGroup = {} as FormGroup;

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
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) {
    ngbNavConfig.destroyOnHide = false;
    ngbNavConfig.roles = false;
  }

  ngOnInit(): void {
    this.userToken = this.tokenService.getUserWithJWT();
    this.getUserProfileImage();
    this.createProfileUpdateForm();
    this.createProfileImageUpdateForm();

  }

  createProfileImageUpdateForm() {
    this.profileImageUpdateForm = this.formBuilder.group({
      imagePath: [this.profileImage.imagePath],
    });
  }

  createProfileUpdateForm() {
    this.profileUpdateForm = this.formBuilder.group({
      firstName: [this.userToken.firstName],
      lastName: [this.userToken.lastName],
      email: [this.userToken.email, Validators.email],
    });
  }

  onFileChange(event: any) {
    const file: File = event.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.profileImageService
        .getProfileImageByUser(this.profileImage.userId)
        .subscribe((response) => {
          if (response.data.id === 0) {
            console.log(this.profileImage);
            this.profileImageAdd();
          } else {
            this.profileImageUpdate();
          }
        });
    });

    reader.readAsDataURL(file);
  }

  deleteProfileImage() {
    this.profileImageService
      .delete(this.profileImage.id!)
      .subscribe((response) => {
        this.toastrService.success(
          response.message,
          environment.successMessage
        );
      });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  profileImageUpdate() {
    this.profileImageService
      .update(this.selectedFile.file, this.profileImage.id!)
      .subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
          this.ngOnInit();
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
  }

  profileImageAdd() {
    this.profileImageService
      .add(this.selectedFile.file, this.profileImage)
      .subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
          this.ngOnInit();
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
  }

  update() {
    if (this.profileUpdateForm.valid) {
      let userModel: User = Object.assign({}, this.profileUpdateForm.value);
      userModel.id = this.userToken.id;

      this.userService.updateWithoutPassword(userModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
          this.ngOnInit();
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  getRouterPath(): string {
    return this.router.url;
  }

  // getCustomerDetails() {
  //   this.customerService.getDetailsByUser(this.userToken.id).subscribe(
  //     (response) => {
  //       this.customer = response.data;
  //     },
  //     (responseError) => {
  //       this.errorService.writeErrorMessages(responseError);
  //     }
  //   );
  // }

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
}
