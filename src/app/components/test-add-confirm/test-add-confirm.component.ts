import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { ErrorService } from 'src/app/services/error.service';
import { TestAddService } from 'src/app/services/test-add.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-add-confirm',
  templateUrl: './test-add-confirm.component.html',
  styleUrls: ['./test-add-confirm.component.css'],
})
export class TestAddConfirmComponent implements OnInit {
  addedTest: TestDetailsDto;

  constructor(
    private testAddService: TestAddService,
    private testService: TestService,
    private tokenService: TokenService,
    private errorService: ErrorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAddedTest();
  }

  getAddedTest() {
    this.addedTest = this.testAddService.getTest();
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  add() {
    this.testService.addWithDetails(this.addedTest).subscribe(
      (response) => {
        sessionStorage.removeItem('testAddForm');
        this.router.navigate(['user/tests']);
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
