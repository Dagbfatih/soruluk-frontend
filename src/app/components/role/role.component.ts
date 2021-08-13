import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Role } from 'src/app/models/entities/role';
import { ErrorService } from 'src/app/services/error.service';
import { RoleService } from 'src/app/services/role.service';
import { RoleAddComponent } from '../role-add/role-add.component';
import { RoleDeleteComponent } from '../role-delete/role-delete.component';
import { RoleUpdateComponent } from '../role-update/role-update.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  dataLoaded = false;
  constructor(
    private roleService: RoleService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.roleService.getRoles().subscribe(
      (response) => {
        this.roles = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  openAddModal(){
    var modalReferance = this.modalService.open(RoleAddComponent, {
      size: 'm',
    });
  }

  openDeleteModal(role:Role){
    var modalReferance = this.modalService.open(RoleDeleteComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.role = role;
  }

  openUpdateModal(role:Role){
    var modalReferance = this.modalService.open(RoleUpdateComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.role = role;
  }
  
  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
