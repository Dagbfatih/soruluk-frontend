import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { UserOperationClaimDetailsDto } from 'src/app/models/dtos/userOperationClaimDetailsDto';
import { Customer } from 'src/app/models/entities/customer';
import { OperationClaim } from 'src/app/models/entities/operationClaim';
import { User } from 'src/app/models/entities/user';
import { UserOperationClaim } from 'src/app/models/entities/userOperationClaim';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorService } from 'src/app/services/error.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { UserOperationClaimDeleteComponent } from '../user-operation-claim-delete/user-operation-claim-delete.component';

@Component({
  selector: 'app-user-operation-claim',
  templateUrl: './user-operation-claim.component.html',
  styleUrls: ['./user-operation-claim.component.css'],
})
export class UserOperationClaimComponent implements OnInit {
  userOperationClaims: UserOperationClaimDetailsDto[] = [];
  operationClaims: OperationClaim[] = [];
  users: User[] = [];
  dataLoaded = false;
  customers: Customer[] = [];

  constructor(
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService,
    private operationClaimService: OperationClaimService,
    private errorService: ErrorService,
    private userService: UserService,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getAllUsers();
    this.getAllOperationClaims();
    this.getAllUserOperationClaimDetails();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getCustomerByUser(userId: number): Customer {
    return this.customers.find((c) => c.userId == userId)!;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
    });
  }

  getAllOperationClaims() {
    this.operationClaimService.getAll().subscribe((response) => {
      this.operationClaims = response.data;
    });
  }

  getAllUserOperationClaimDetails() {
    this.userOperationClaimService.getAllDetails().subscribe((response) => {
      this.userOperationClaims = response.data;
      this.dataLoaded = true;
    });
  }

  getUserClaims(user: User): string[] {
    return this.userOperationClaims
      .filter((c) => c.user.id == user.id)
      .map((c) => c.operationClaim.name);
  }

  setClaims() {}

  getNotAvailableClaims(userId: number): OperationClaim[] {
    let availableClaims = this.getAvailableClaims(userId);
    return this.operationClaims.filter(
      (c) => !availableClaims.map((a) => a.operationClaim.id).includes(c.id)
    );
  }

  getAvailableClaims(userId: number): UserOperationClaimDetailsDto[] {
    return this.userOperationClaims.filter((c) => c.user.id === userId);
  }

  delete(userOperationClaim: UserOperationClaimDetailsDto) {
    let userOperationClaimModel: UserOperationClaim = {
      id: userOperationClaim.userOperationClaimId,
      operationClaimId: userOperationClaim.operationClaim.id!,
      userId: userOperationClaim.user.id,
    };

    this.userOperationClaimService.delete(userOperationClaimModel).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          environment.successMessage
        );
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  add(operationClaim: OperationClaim, userId: number) {
    let userOperationClaimModel: UserOperationClaim = {
      userId: userId,
      operationClaimId: operationClaim.id!,
    };

    this.userOperationClaimService.add(userOperationClaimModel).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          environment.successMessage
        );
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  confirmAccount(userId: number) {
    let customerModel: Customer = {
      isConfirmed: true,
      roleId: this.getCustomerByUser(userId).roleId,
      userId: userId,
      id: this.getCustomerByUser(userId).id,
      lessonId: 1,
    };

    this.customerService.confirmAccunt(customerModel).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          environment.successMessage
        );
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
