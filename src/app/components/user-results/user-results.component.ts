import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { TestResultDetailsDto } from 'src/app/models/dtos/testResultDetailsDto';
import { User } from 'src/app/models/entities/user';
import { ErrorService } from 'src/app/services/error.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TokenService } from 'src/app/services/token.service';
import { UserResultDetailsComponent } from '../user-result-details/user-result-details.component';

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.css'],
})
export class UserResultsComponent implements OnInit {
  dataLoaded = false;
  testResults: TestResultDetailsDto[] = [];
  user: User;

  constructor(
    private testResultService: TestResultService,
    private tokenService: TokenService,
    private errorService: ErrorService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getTestResultsByUser();
  }

  getTestResultsByUser() {
    this.testResultService.getAllDetailsByUser(this.user.id).subscribe(
      (response) => {
        this.testResults = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getUser() {
    this.user = this.tokenService.getUserWithJWTFromCookie();
  }

  getCorrectNumber(testResult: TestResultDetailsDto): number {
    return testResult.questionResults.filter((q) => q.accuracy).length;
  }

  getIncorrectNumber(testResult: TestResultDetailsDto): number {
    return testResult.questionResults.filter(
      (q) => !q.accuracy && q.selectedOptionId !== 0
    ).length;
  }

  getEmptyNumber(testResult: TestResultDetailsDto): number {
    return testResult.questionResults.filter((q) => q.selectedOptionId === 0)
      .length;
  }

  openResultDetailsModal(testResultId: number) {
    var modalReferance = this.modalService.open(UserResultDetailsComponent, {
      windowClass: 'custom-modal',
    });
    console.log(
      this.testResults.find((t) => t.resultDetails.id == testResultId)
    );

    modalReferance.componentInstance.testResult = this.testResults.find(
      (t) => t.resultDetails.id == testResultId
    );
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
