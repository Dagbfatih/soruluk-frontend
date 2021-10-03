import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { User } from 'src/app/models/entities/user';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import { QuestionDeleteComponent } from '../question-delete/question-delete.component';
import { QuestionUpdateComponent } from '../question-update/question-update.component';
import { TestAddComponent } from '../test-add/test-add.component';
import { TestDeleteComponent } from '../test-delete/test-delete.component';
import { TestUpdateComponent } from '../test-update/test-update.component';

@Component({
  selector: 'app-user-tests',
  templateUrl: './user-tests.component.html',
  styleUrls: ['./user-tests.component.css'],
})
export class UserTestsComponent implements OnInit {
  dataLoaded = false;
  tests: TestDetailsDto[] = [];
  filterText: string = '';
  user: User = {} as User;
  minTime: number = 0;
  maxTime: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private errorService: ErrorService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private router: Router,
    private tokenService: TokenService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUserWithJWT();
    this.activatedRoute.params.subscribe((params) => {
      if (params['minTime'] || params['maxTime']) {
        this.getDetailsByMinAndMaxTime(params['minTime'], params['maxTime']);
      } else {
        this.getTestsByUser();
      }
    });
  }

  getTestsByUser() {
    this.testService
      .getTestDetailsByUser(this.user.id)
      .subscribe((response) => {
        this.tests = response.data;
        this.dataLoaded = true;
      });
  }

  getDetailsByMinAndMaxTime(minTime: number, maxTime: number) {
    this.testService
      .getTestDetailsByUser(this.user.id)
      .subscribe((response) => {
        this.tests = response.data.filter(
          (t) => t.test.testTime >= minTime && t.test.testTime <= maxTime
        );
        this.dataLoaded = true;
      });
  }

  openUpdateTestModal(testId: number) {
    var modalReferance = this.modalService.open(TestUpdateComponent, {
      windowClass: 'custom-modal',
    });

    modalReferance.componentInstance.test = this.tests.find(
      (t) => t.test.id == testId
    );
  }

  openDeleteTestModal(testId: number) {
    var modalReferance = this.modalService.open(TestDeleteComponent, {
      size: 'm',
    });
    modalReferance.componentInstance.test = this.tests.find(
      (t) => t.test.id == testId
    );
  }

  openAddTestComponent() {
    this.router.navigate(['/tests/add']);
  }

  getUrl() {
    return this.router.url;
  }

  getOption(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  getFilterRouterClass(): string {
    if (
      this.minTime >= 0 &&
      this.minTime != undefined &&
      this.maxTime >= 0 &&
      this.maxTime != undefined
    ) {
      return '/user/tests/' + this.minTime + '/' + this.maxTime;
    } else {
      return '/user/tests';
    }
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
