import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CountdownComponent, CountdownModule } from 'ngx-countdown';
import {
  countDownTimerConfigModel,
  CountdownTimerService,
  countDownTimerTexts,
  countUpTimerConfigModel,
  CountupTimerService,
} from 'ngx-timer';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { browserRefresh } from 'src/app/app.component';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { FinishConfirmModalComponent } from 'src/app/modals/finish-confirm-modal/finish-confirm-modal.component';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { QuestionResultDetailsDto } from 'src/app/models/dtos/questionResultDetailsDto';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { TestResultDetailsDto } from 'src/app/models/dtos/testResultDetailsDto';
import { User } from 'src/app/models/entities/user';
import { ErrorService } from 'src/app/services/error.service';
import { ExamService } from 'src/app/services/exam.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

interface TimerValue {
  seconds: string;
  mins: string;
  hours: string;
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit, OnDestroy {
  test: TestDetailsDto = {} as TestDetailsDto;
  questionOrder: number = 0;
  dataLoaded = false;
  testConfig: countDownTimerConfigModel = new countDownTimerConfigModel();
  onTimerStatusChange: Subscription;
  onSecondChange: Subscription;
  testResult: TestResultDetailsDto = {} as TestResultDetailsDto;
  user: User;
  minutes: number;
  pageRefreshed = true;

  constructor(
    private testService: TestService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService,
    private countdownTimerService: CountdownTimerService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private testResultService: TestResultService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.saveAllBeforeRefresh();
    this.getQuestionOrder();
    this.activatedRoute.params.subscribe((params) => {
      if (params['testId']) {
        this.getUser();
        this.getTestDetails(params['testId']);
      }
    });
  }

  ngOnDestroy(): void {
    this.onTimerStatusChange.unsubscribe();
    this.onSecondChange.unsubscribe();
    localStorage.removeItem('testResult');
    localStorage.removeItem('questionOrder');
  }

  getTestDetails(id: number) {
    this.testService.getTestDetailsById(id).subscribe(
      (response) => {
        this.test = response.data;
        this.dataLoaded = true;

        this.startTimer();
        this.checkStatus();
        this.checkTime();
        this.setTestResultForStart();
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getQuestionOrder() {
    localStorage.getItem('questionOrder') !== null
      ? (this.questionOrder = +localStorage.getItem('questionOrder')!)
      : undefined;
    localStorage.removeItem('questionOrder');
  }

  saveAllBeforeRefresh() {
    window.onbeforeunload = () => {
      sessionStorage.setItem(
        'leftTime',
        JSON.stringify(this.countdownTimerService.timerValue)
      );

      this.pushTestResultToLocalStorage();

      localStorage.setItem('questionOrder', this.questionOrder.toString());
    };
  }

  pushTestResultToLocalStorage() {
    // Güvenlik açığı düzeltilecek

    // this.testResult.questionResults.map((qr) => (qr.correctOptionId = 0));
    // this.testResult.questionResults
    //   .map((qr) => qr.question)
    //   .forEach((q) => q.options.forEach((o) => (o.accuracy = false)));

    localStorage.setItem('testResult', JSON.stringify(this.testResult));
  }

  getTestResultFromLocalStorage() {
    this.testResult = JSON.parse(localStorage.getItem('testResult')!);
    localStorage.removeItem('testResult');

    // Güvenlik açığı düzeltilecek

    // for (let i = 0; i < this.testResult.questionResults.length; i++) {
    //   this.testResult.questionResults[i].correctOptionId = this.test.questions[
    //     i
    //   ].options.find((o) => o.accuracy)?.id!;
    // }

    // for (let i = 0; i < this.testResult.questionResults.length; i++) {
    //   this.testResult.questionResults[i].question.options.forEach((o) => {
    //     o.accuracy = this.test.questions[i].options.find(
    //       (op) => op.id == o.id
    //     )?.accuracy!;
    //   });
    // }
  }

  setTestResultForStart() {
    if (localStorage.getItem('testResult')) {
      this.getTestResultFromLocalStorage();
    } else {
      this.testResult.testDetails = {
        id: this.test.testId,
        mixedCategory: this.test.mixedCategory,
        privacy: this.test.privacy,
        testName: this.test.testName,
        testNotes: this.test.testNotes,
        testTime: this.test.testTime,
        userId: this.user.id,
        branchId: this.test.branchId,
      };

      this.testResult.resultDetails = {
        testId: this.test.testId,
        userId: this.user.id,
        id: 0,
        finishDate: 0,
      };

      this.testResult.questionResults = [];
      this.test.questions.forEach((q) => {
        let correctOption: number = q.options.find((o) => o.accuracy)?.id!;
        let questionResult: QuestionResultDetailsDto = {
          question: q,
          selectedOptionId: 0,
          questionId: q.questionId,
          testResultId: 0,
          correctOptionId: correctOption,
          accuracy: false,
          questionResultId: 0,
        };

        this.testResult.questionResults.push(questionResult);
      });
    }
  }

  getUser() {
    this.user = this.tokenService.getUserWithJWTFromCookie();
  }

  getQuestion(): QuestionDetailsDto {
    return this.test.questions[this.questionOrder];
  }

  getQuestionResult(questionId: number): QuestionResultDetailsDto {
    return this.testResult.questionResults.find(
      (q) => q.questionId == questionId
    )!;
  }

  getOptionNumber(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  startTimer() {
    this.examService.start(this.test.testTime);
  }

  checkStatus() {
    this.onTimerStatusChange =
      this.countdownTimerService.onTimerStatusChange.subscribe((status) => {
        if (status == 'STOP') {
          this.finishOnTimerExpire();
        }
      });
  }

  checkTime() {
    this.onSecondChange = this.countdownTimerService.interval.subscribe((i) => {
      this.minutes = Math.trunc(this.countdownTimerService.totalSeconds / 60);
    });
  }

  checkPageRefreshed(): boolean {
    this.pageRefreshed = browserRefresh;
    return this.pageRefreshed;
  }

  setTimerConfig() {
    this.testConfig.timerTexts = new countDownTimerTexts();
    this.testConfig.timerTexts.hourText = ' :'; //default - hh
    this.testConfig.timerTexts.minuteText = ' :'; //default - mm
    this.testConfig.timerTexts.secondsText = ' '; //default - ss
    this.testConfig.timerClass = 'test_Timer_class';
  }

  optionSelected(event: any, selectedQuestion: number = this.questionOrder) {
    this.testResult.questionResults[selectedQuestion].selectedOptionId =
      +event.target.value;

    this.testResult.questionResults[selectedQuestion].accuracy =
      +event.target.value ==
      this.testResult.questionResults[selectedQuestion].correctOptionId;
  }

  previousQuestion() {
    if (this.questionOrder == 0) {
      return;
    } else {
      this.questionOrder--;
    }
  }

  nextQuestion() {
    if (this.questionOrder == this.test.questions.length - 1) {
      return;
    } else {
      this.questionOrder++;
    }
  }

  getCheckedClass(i: number, j: number): boolean {
    return (
      this.testResult.questionResults[i].selectedOptionId ===
      this.test.questions[i].options[j].id
    );
  }

  setEmpty() {
    this.testResult.questionResults[this.questionOrder].selectedOptionId = 0;
  }

  finishOnUserRequest() {
    let modalReferance = this.showFinishConfirmModal();

    modalReferance.result.then((result) => {
      if (result) {
        let testResultModel: TestResultDetailsDto = Object.assign(
          {},
          this.testResult
        );
        testResultModel.resultDetails.finishDate = this.minutes;
        this.testResultService.addWithDetails(testResultModel).subscribe(
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

        this.pageRefreshed = false;
        localStorage.setItem('examFinished', 'true');
        this.router.navigate(['/user/results']);
      }
    });
  }

  finishOnTimerExpire() {
    let testResultModel: TestResultDetailsDto = Object.assign(
      {},
      this.testResult
    );

    testResultModel.resultDetails.finishDate = this.minutes;

    this.testResultService.addWithDetails(testResultModel).subscribe(
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

    this.pageRefreshed = false;
    localStorage.setItem('examFinished', 'true');
    this.router.navigate(['/tests/details']);
  }

  showFinishConfirmModal(): NgbModalRef {
    let modalReferance: NgbModalRef = this.modalService.open(
      FinishConfirmModalComponent,
      { size: 'm' }
    );

    return modalReferance;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
