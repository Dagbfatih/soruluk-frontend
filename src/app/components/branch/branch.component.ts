import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Branch } from 'src/app/models/entities/branch';
import { BranchService } from 'src/app/services/branch.service';
import { ErrorService } from 'src/app/services/error.service';
import { BranchAddComponent } from '../branch-add/branch-add.component';
import { BranchDeleteComponent } from '../branch-delete/branch-delete.component';
import { BranchUpdateComponent } from '../branch-update/branch-update.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
  branches: Branch[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private branchService: BranchService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllBranches();
  }

  getAllBranches() {
    this.branchService.getAll().subscribe((response) => {
      this.branches = response.data;
      this.dataLoaded = true;
    });
  }

  openAddModal() {
    var modalReferance = this.modalService.open(BranchAddComponent, {
      size: 'm',
    });
  }

  openUpdateModal(branch: Branch) {
    var modalReferance = this.modalService.open(BranchUpdateComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.branch = branch;
  }

  openDeleteModal(branch: Branch) {
    var modalReferance = this.modalService.open(BranchDeleteComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.branch = branch;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
