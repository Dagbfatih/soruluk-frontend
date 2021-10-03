import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/entities/role';
import { User } from 'src/app/models/entities/user';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetailsDto } from 'src/app/models/dtos/customerDetailsDto';
import { Router } from '@angular/router';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { ProfileImage } from 'src/app/models/entities/profileImage';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';
import { Branch } from 'src/app/models/entities/branch';
import { BranchService } from 'src/app/services/branch.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  profileImage: ProfileImage = {} as ProfileImage;
  baseUrl = environment.baseUrl;
  customer: CustomerDetailsDto = {} as CustomerDetailsDto;
  profileUpdateForm: FormGroup = {} as FormGroup;
  profileImageUpdateForm: FormGroup = {} as FormGroup;
  roles: Role[];
  selectedFile: ImageSnippet;
  questions: QuestionDetailsDto[] = [];
  tests: TestDetailsDto[] = [];
  branches: Branch[] = [];
  userToken: User;

  constructor(
    private tokenService: TokenService,
    private profileImageService: ProfileImageService,
    private userService: UserService,
    private errorService: ErrorService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private router: Router,
    private questionService: QuestionService,
    private testService: TestService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.userToken = this.tokenService.getUserWithJWT();
    this.getUserProfileImage();
    this.getCustomerDetails();
    this.getAllQuestionDetails();
    this.getAllTestDetails();
    // this.getAllBranches();
    this.createProfileUpdateForm();
    this.createProfileImageUpdateForm();
  }

  // getAllBranches() {
  //   this.branchService.getAll().subscribe((response) => {
  //     this.branches = response.data;
  //   });
  // }

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

  createProfileImageUpdateForm() {
    this.profileImageUpdateForm = this.formBuilder.group({
      imagePath: [this.profileImage.imagePath],
    });
  }

  createProfileUpdateForm() {
    this.profileUpdateForm = this.formBuilder.group({
      firstName: [this.customer.firstName],
      lastName: [this.customer.lastName],
      email: [this.customer.email, Validators.email],
      status: [this.customer.status],
    });
  }

  getCustomerDetails() {
    this.customerService
      .getDetailsByUser(this.userToken.id)
      .subscribe(
        (response) => {
          this.customer = response.data;
          this.profileUpdateForm.setValue({
            firstName: this.customer.firstName,
            lastName: this.customer.lastName,
            email: this.customer.email,
            status: this.customer.status,
          });
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
  }

  getUserProfileImage() {
    this.profileImageService
      .getProfileImageByUser(this.userToken.id)
      .subscribe((response) => {
        this.profileImage = response.data;
        console.log(this.profileImage);
      });
  }

  getRoles() {
    this.roleService.getRoles().subscribe((response) => {
      this.roles = response.data;
    });
  }

  checkStatus(): boolean {
    return this.profileUpdateForm.get('status')?.value;
  }

  onFileChange(event: any) {
    console.log('file change');
    // this.selectedFile = event.target.files[0];

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
      userModel.id = this.customer.customerDetails.userId;

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

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
