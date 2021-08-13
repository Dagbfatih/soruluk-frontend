import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { ExamComponent } from '../components/exam/exam.component';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ExamGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private modalService: NgbModal) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('examFinished') === 'true') {
      localStorage.removeItem('examFinished');
      return true;
    }
    let modalReferance: NgbModalRef = this.showExitConfirmModal();
    return modalReferance.result;
  }

  showExitConfirmModal() {
    let modalReferance: NgbModalRef = this.modalService.open(
      ConfirmationDialogComponent,
      { size: 'm' }
    );
    return modalReferance;
  }
}
