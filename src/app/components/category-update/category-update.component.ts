import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/entities/category';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css'],
})
export class CategoryUpdateComponent implements OnInit {
  categoryUpdateForm: FormGroup;
  category: Category;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createCategoryUpdateForm();
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  createCategoryUpdateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      categoryName: [this.category.categoryName, Validators.required],
      categoryId: [this.category.categoryId],
    });
  }

  close() {
    this.activeModal.close('Category Update Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Category Update Modal Dismissed');
  }

  add() {
    if (this.categoryUpdateForm.valid) {
      let categoryModel: Category = Object.assign(
        {},
        this.categoryUpdateForm.value
      );
      categoryModel.categoryId = this.category.categoryId;

      this.categoryService.update(categoryModel).subscribe(
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
}
