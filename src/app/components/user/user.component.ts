import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { UserOperationClaimDetailsDto } from 'src/app/models/dtos/userOperationClaimDetailsDto';
import { User } from 'src/app/models/entities/user';
import { TokenService } from 'src/app/services/token.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  dataLoaded = false;
  userOperationClaims: UserOperationClaimDetailsDto[] = [];
  placementArray: string[] = ['top', 'right', 'left', 'bottom'];
  filterText:string="";

  constructor(
    private userService: UserService,
    private userOperationClaimService: UserOperationClaimService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getAllUserOperationClaimDetails();
  }

  getAllUserOperationClaimDetails() {
    this.userOperationClaimService.getAllDetails().subscribe((response) => {
      this.userOperationClaims = response.data;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
      this.dataLoaded = true;
    });
  }

  getUserOperationClaims(userId: number): string[] {
    let userOperationClaimsByUser = this.userOperationClaims.filter(
      (c) => c.user.id == userId
    );
    let claims = userOperationClaimsByUser.map((c) => c.operationClaim.name);

    return claims;
  }

  openDeleteModal(user: User) {
    var modalReferance = this.modalService.open(UserDeleteComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.user = user;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
