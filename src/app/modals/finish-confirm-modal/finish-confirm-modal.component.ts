import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-finish-confirm-modal',
  templateUrl: './finish-confirm-modal.component.html',
  styleUrls: ['./finish-confirm-modal.component.css']
})
export class FinishConfirmModalComponent implements OnInit {

  constructor(private modalService:NgbModal,
    private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  finish(){
    this.activeModal.close(true);
  }

  close() {
    this.activeModal.close(false);
  }

  dismiss() {
    this.activeModal.dismiss(false);
  }
}
