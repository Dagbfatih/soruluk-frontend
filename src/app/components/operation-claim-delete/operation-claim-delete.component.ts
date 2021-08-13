import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { OperationClaim } from 'src/app/models/entities/operationClaim';
import { ErrorService } from 'src/app/services/error.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-operation-claim-delete',
  templateUrl: './operation-claim-delete.component.html',
  styleUrls: ['./operation-claim-delete.component.css'],
})
export class OperationClaimDeleteComponent implements OnInit {
  operationClaim: OperationClaim = {} as OperationClaim;

  constructor(
    private operationClaimService: OperationClaimService,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Operation Claim Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Operation Claim Delete Modal Dismissed');
  }

  delete() {
    console.log(this.operationClaim.id);
    this.operationClaimService.delete(this.operationClaim).subscribe(
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
