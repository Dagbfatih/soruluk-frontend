import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Branch } from 'src/app/models/entities/branch';
import { BranchService } from 'src/app/services/branch.service';
import { ErrorService } from 'src/app/services/error.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css'],
})
export class BranchAddComponent implements OnInit {
  branch: Branch = {} as Branch;
  branchAddForm: FormGroup;

  constructor(
    private branchService: BranchService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.createBranchAddForm();
  }

  createBranchAddForm() {
    this.branchAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close('Branch Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Branch Add Modal Dismissed');
  }

  add() {
    if (this.branchAddForm.valid) {
      let branchModel: Branch = Object.assign({}, this.branchAddForm.value);

      this.branchService.add(branchModel).subscribe(
        (response) => {
          this.toastrService.success(
            environment.successMessage,
            response.message
          );
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
