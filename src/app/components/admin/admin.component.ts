import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { UserOperationClaimDetailsDto } from 'src/app/models/dtos/userOperationClaimDetailsDto';
import { OperationClaim } from 'src/app/models/entities/operationClaim';
import { User } from 'src/app/models/entities/user';
import { UserOperationClaim } from 'src/app/models/entities/userOperationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { TokenService } from 'src/app/services/token.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import { OperationClaimAddComponent } from '../operation-claim-add/operation-claim-add.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  dataLoaded = false;
  userOperationClaims: UserOperationClaimDetailsDto[] = [];
  currentPage: string = this.getCurrentPage();

  constructor(
    private userService: UserService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.setCurrentPage('users');
    this.getAllUsers();
    this.getAllUserOperationClaims();
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  setCurrentPage(pageName: string) {
    if (!sessionStorage.getItem('adminCurrentPage')) {
      sessionStorage.setItem('adminCurrentPage', 'users');
    } else {
      sessionStorage.setItem('adminCurrentPage', pageName);
    }
  }

  getCurrentPage(): string {
    if (sessionStorage.getItem('adminCurrentPage')) {
      return sessionStorage.getItem('adminCurrentPage')!;
    } else {
      return 'users';
    }
  }

  getAllUserOperationClaims() {
    this.userOperationClaimService.getAllDetails().subscribe((response) => {
      this.userOperationClaims = response.data;
    });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
      this.dataLoaded = true;
    });
  }

  pageIsUsers(): boolean {
    return this.currentPage == 'users';
  }

  pageIsClaims(): boolean {
    return this.currentPage == 'claims';
  }

  pageIsUserClaims(): boolean {
    return this.currentPage == 'userClaims';
  }

  pageIsLanguages(): boolean {
    return this.currentPage == 'languages';
  }

  pageIsTranslates(): boolean {
    return this.currentPage == 'translates';
  }

  pageIsRoles(): boolean {
    return this.currentPage == 'roles';
  }

  pageIsBranches(): boolean {
    return this.currentPage == 'branches';
  }

  openAddOperationClaimModal() {
    var modalReferance = this.modalService.open(OperationClaimAddComponent, {
      size: 'm',
    });
  }
}
