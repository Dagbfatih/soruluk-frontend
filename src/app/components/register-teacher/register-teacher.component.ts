import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { CustomerForRegisterDto } from 'src/app/models/dtos/customerForRegisterDto';
import { RegisterDtoForFormControl } from 'src/app/models/dtos/registerDtoForFormControl';
import { Branch } from 'src/app/models/entities/branch';
import { Role } from 'src/app/models/entities/role';
import { AuthService } from 'src/app/services/auth.service';
import { BranchService } from 'src/app/services/branch.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorService } from 'src/app/services/error.service';
import { RoleService } from 'src/app/services/role.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css'],
})
export class RegisterTeacherComponent implements OnInit {
  registerForm: FormGroup;
  roles: Role[] = [];
  branches: Branch[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private branchService: BranchService,
    private carouselConfig: NgbCarouselConfig,
    private authService: AuthService,
    private customerService: CustomerService,
    private tokenService: TokenService,
    private errorService: ErrorService,
    private router: Router
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
      roleId: [this.roles.find((r) => r.roleName == 'Teacher')?.id],
      branchId: [0, Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerDtoModel: RegisterDtoForFormControl = Object.assign(
        {},
        this.registerForm.value
      );

      registerDtoModel.roleId = this.roles.find(
        (r) => r.roleName == 'Teacher'
      )?.id!;
      registerDtoModel.branchId = +registerDtoModel.branchId;
      let registerModel: CustomerForRegisterDto =
        this.createCustomerForRegisterDto(registerDtoModel);

      this.authService.registerWithCustomer(registerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, environment.successMessage);
          this.tokenService.setTokenOnCookie(response.data.token);
          this.router.navigate(['/user/profile/edit']);
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
