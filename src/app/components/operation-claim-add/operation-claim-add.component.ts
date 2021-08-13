import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { OperationClaim } from 'src/app/models/entities/operationClaim';
import { ErrorService } from 'src/app/services/error.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-operation-claim-add',
  templateUrl: './operation-claim-add.component.html',
  styleUrls: ['./operation-claim-add.component.css'],
})
export class OperationClaimAddComponent implements OnInit {
  operationClaimAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private operationClaimService: OperationClaimService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createOperationClaimAddForm();
  }

  createOperationClaimAddForm() {
    this.operationClaimAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.operationClaimAddForm.valid) {
      let operationClaimModel = Object.assign(
        {},
        this.operationClaimAddForm.value
      );
      console.log(operationClaimModel);

      this.operationClaimService.add(operationClaimModel).subscribe(
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
  }

  close() {
    this.activeModal.close('Claim Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Claim Add Modal Dismissed');
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
