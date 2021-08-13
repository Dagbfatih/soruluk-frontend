import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Role } from 'src/app/models/entities/role';
import { ErrorService } from 'src/app/services/error.service';
import { RoleService } from 'src/app/services/role.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.css'],
})
export class RoleDeleteComponent implements OnInit {
  role: Role = {} as Role;

  constructor(
    private activeModal: NgbActiveModal,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Role Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Role Delete Modal Dismissed');
  }

  delete() {
    this.roleService.delete(this.role).subscribe(
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
