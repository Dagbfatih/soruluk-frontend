import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Branch } from 'src/app/models/entities/branch';
import { BranchService } from 'src/app/services/branch.service';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.css'],
})
export class BranchUpdateComponent implements OnInit {
  branch: Branch = {} as Branch;
  branchUpdateForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createBranchUpdateForm();
  }

  createBranchUpdateForm() {
    this.branchUpdateForm = this.formBuilder.group({
      name: [this.branch.name, Validators.required],
      id: [this.branch.id],
    });
  }

  close() {
    this.activeModal.close('Branch Update Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Branch Update Modal Dismissed');
  }

  add() {
    if (this.branchUpdateForm.valid) {
      let branchModel: Branch = Object.assign({}, this.branchUpdateForm.value);
      branchModel.id = this.branch.id;

      this.branchService.update(branchModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
          this.dismiss();
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
