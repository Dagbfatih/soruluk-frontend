import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { User } from 'src/app/models/entities/user';
import { ErrorService } from 'src/app/services/error.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css'],
})
export class UserDeleteComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('User Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('User Delete Modal Dismissed');
  }

  delete() {
    this.userService.delete(this.user).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          environment.successMessage
        );
        this.close();
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
