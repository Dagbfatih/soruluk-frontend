import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { RoleService } from 'src/app/services/role.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Role } from 'src/app/models/entities/role';
import { environment } from 'src/environments/environment';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css'],
})
export class RoleUpdateComponent implements OnInit {
  roleUpdateForm: FormGroup;
  role: Role = {} as Role;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createRoleUpdateForm();
  }

  createRoleUpdateForm() {
    this.roleUpdateForm = this.formBuilder.group({
      id:[this.role.id],
      roleName: [this.role.roleName, Validators.required]
    });
  }

  close() {
    this.activeModal.close('Role Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Role Add Modal Dismissed');
  }

  update() {
    if (this.roleUpdateForm.valid) {
      let roleModel: Role = Object.assign({}, this.roleUpdateForm.value);
      
      this.roleService.update(roleModel).subscribe(
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

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
