import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { OperationClaim } from 'src/app/models/entities/operationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { OperationClaimAddComponent } from '../operation-claim-add/operation-claim-add.component';
import { OperationClaimDeleteComponent } from '../operation-claim-delete/operation-claim-delete.component';

@Component({
  selector: 'app-operation-claim',
  templateUrl: './operation-claim.component.html',
  styleUrls: ['./operation-claim.component.css'],
})
export class OperationClaimComponent implements OnInit {
  operationClaims: OperationClaim[] = [];
  dataLoaded = false;

  constructor(
    private operationClaimService: OperationClaimService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllOperationClaims();
  }

  getAllOperationClaims() {
    this.operationClaimService.getAll().subscribe((response) => {
      this.operationClaims = response.data;
      this.dataLoaded = true;
    });
  }

  openAddModal() {
    var modalReferance = this.modalService.open(OperationClaimAddComponent, {
      size: 'm',
    });
  }

  openDeleteModal(operationClaim: OperationClaim) {
    var modalReferance = this.modalService.open(OperationClaimDeleteComponent, {
      size: 'm',
    });
    
    modalReferance.componentInstance.operationClaim = operationClaim;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
