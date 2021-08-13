import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/entities/role';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RoleService } from 'src/app/services/role.service';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/models/entities/customer';
import { TokenService } from 'src/app/services/token.service';
import { CustomerForRegisterDto } from 'src/app/models/dtos/customerForRegisterDto';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserOperationClaim } from 'src/app/models/entities/userOperationClaim';
import { RegisterDtoForFormControl } from 'src/app/models/dtos/registerDtoForFormControl';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Branch } from 'src/app/models/entities/branch';
import { BranchService } from 'src/app/services/branch.service';
import {
  NgbCarousel,
  NgbCarouselConfig,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: Role[] = [];
  branches: Branch[] = [];
  accountType = 'student';
  @ViewChild('carousel', { static: true }) ngbCarousel: NgbCarousel;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private customerService: CustomerService,
    private tokenService: TokenService,
    private errorService: ErrorService,
    private router: Router,
    private userOperationClaimService: UserOperationClaimService,
    private branchService: BranchService,
    private carouselConfig: NgbCarouselConfig
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getBranches();
    this.createRegisterForm();
  }

  getBranches() {
    this.branchService.getAll().subscribe((response) => {
      this.branches = response.data;
    });
  }

  getRoles() {
    this.roleService.getRoles().subscribe((response) => {
      this.roles = response.data;
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [
        this.roles.find((r) => r.roleName == 'Student')?.id,
        Validators.required,
      ],
      branchId: [0, Validators.required],
    });
  }

  next() {
    this.ngbCarousel.next();
  }

  setAccountType(accountType: string) {
    this.accountType = accountType;
  }

  register() {
    if (this.registerForm.valid) {
      let registerDtoModel: RegisterDtoForFormControl = Object.assign(
        {},
        this.registerForm.value
      );
      registerDtoModel.roleId = +registerDtoModel.roleId;
      registerDtoModel.branchId = +registerDtoModel.branchId;
      let registerModel: CustomerForRegisterDto =
        this.createCustomerForRegisterDto(registerDtoModel);
      console.log(registerModel);
      // this.authService.registerWithCustomer(registerModel).subscribe(
      //   (response) => {
      //     this.toastrService.success('Kullanıcı kaydedildi');
      //     this.tokenService.setTokenOnCookie(response.data.token);
      //     this.router.navigate(['/user/profile/edit']);
      //   },
      //   (responseError) => {
      //     this.errorService.writeErrorMessages(responseError);
      //   }
      // );
    } else {
      this.toastrService.warning(
        environment.allFieldsRequired,
        environment.warningMessage
      );
    }
  }

  createCustomerForRegisterDto(
    registerDtoModel: RegisterDtoForFormControl
  ): CustomerForRegisterDto {
    let registerModel: CustomerForRegisterDto = {
      customer: {
        userId: 0,
        isConfirmed: registerDtoModel.isConfirmed,
        roleId: registerDtoModel.roleId,
        branchId: registerDtoModel.branchId,
      },
      user: {
        firstName: registerDtoModel.firstName,
        lastName: registerDtoModel.lastName,
        email: registerDtoModel.email,
        password: registerDtoModel.password,
      },
    };

    return registerModel;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
