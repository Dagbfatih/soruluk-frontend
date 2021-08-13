import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  countDownTimerConfigModel,
  CountdownTimerService,
  countDownTimerTexts,
} from 'ngx-timer';
import { Subscription } from 'rxjs';
import { browserRefresh } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  timerConfig: countDownTimerConfigModel = new countDownTimerConfigModel();
  onTimerStatusChange: Subscription;
  onSecondChange: Subscription;
  minutes: number;
  pageRefreshsubscription: Subscription;
  pageRefreshed: boolean;
  leftTime: number;

  constructor(
    private countdownTimerService: CountdownTimerService,
    private router: Router
  ) {}

  start(remainingTime: number) {
    let testTime = new Date();
    this.setTimerConfig();

    if (browserRefresh) {
      let time = JSON.parse(sessionStorage.getItem('leftTime')!);
      sessionStorage.removeItem('leftTime');

      testTime.setHours(testTime.getHours() + +time.mins / 60);
      testTime.setMinutes(testTime.getMinutes() + (+time.mins % 60));
      testTime.setSeconds(testTime.getSeconds() + +time.seconds);
    } else {
      testTime.setHours(testTime.getHours() + remainingTime / 60);
      testTime.setMinutes(testTime.getMinutes() + (remainingTime % 60));
    }

    this.countdownTimerService.startTimer(testTime);
  }

  stop() {
    this.countdownTimerService.stopTimer();
  }

  setTimerConfig() {
    this.timerConfig.timerTexts = new countDownTimerTexts();
    this.timerConfig.timerTexts.hourText = ' :'; //default - hh
    this.timerConfig.timerTexts.minuteText = ' :'; //default - mm
    this.timerConfig.timerTexts.secondsText = ' '; //default - ss
    this.timerConfig.timerClass = 'test_Timer_class';
  }
}
