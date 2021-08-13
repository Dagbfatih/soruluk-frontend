import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css'],
})
export class CategoryDeleteComponent implements OnInit {
  category: Category;

  constructor(
    private activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Cateogry Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Cateogry Delete Modal Dismissed');
  }

  delete() {
    this.categoryService.delete(this.category).subscribe(
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
}
