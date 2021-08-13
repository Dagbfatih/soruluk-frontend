import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ErrorService } from 'src/app/services/error.service';
import { alltranslates } from 'src/app/constants/TranslateManager';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent implements OnInit {
  categoryAddForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close('Category Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Category Add Modal Dismissed');
  }

  add() {
    if (this.categoryAddForm.valid) {
      let categoryModel: Category = Object.assign(
        {},
        this.categoryAddForm.value
      );

      this.categoryService.add(categoryModel).subscribe(
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
