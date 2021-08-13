import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Branch } from 'src/app/models/entities/branch';
import { BranchService } from 'src/app/services/branch.service';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branch-delete',
  templateUrl: './branch-delete.component.html',
  styleUrls: ['./branch-delete.component.css'],
})
export class BranchDeleteComponent implements OnInit {
  branch: Branch = {} as Branch;

  constructor(
    private activeModal: NgbActiveModal,
    private branchService: BranchService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Branch Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Branch Delete Modal Dismissed');
  }

  delete() {
    this.branchService.delete(this.branch).subscribe(
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

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
