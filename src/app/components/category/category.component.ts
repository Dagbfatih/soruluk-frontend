import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  dataLoaded = false;
  filterText:string="";

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
      this.dataLoaded = true;
    });
  }

  openAddModal() {
    var modalReferance = this.modalService.open(CategoryAddComponent, {
      size: 'm',
    });
  }

  delete(category: Category) {
    this.categoryService.delete(category).subscribe(
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

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  openDeleteModal(category: Category) {
    var modalReferance = this.modalService.open(CategoryDeleteComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.category = category;
  }

  openUpdateModal(category: Category) {
    var modalReferance = this.modalService.open(CategoryUpdateComponent, {
      size: 'm',
    });

    modalReferance.componentInstance.category = category;
  }
}
