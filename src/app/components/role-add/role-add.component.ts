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
import { Role } from 'src/app/models/entities/role';
import { ErrorService } from 'src/app/services/error.service';
import { RoleService } from 'src/app/services/role.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css'],
})
export class RoleAddComponent implements OnInit {
  roleAddForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService:ToastrService,
    private errorService:ErrorService
  ) {}

  ngOnInit(): void {
    this.createRoleAddForm();
  }

  createRoleAddForm() {
    this.roleAddForm = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close('Role Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Role Add Modal Dismissed');
  }

  add() {
    if (this.roleAddForm.valid) {
      let roleModel: Role = Object.assign({}, this.roleAddForm.value);
      
      this.roleService.add(roleModel).subscribe(
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
