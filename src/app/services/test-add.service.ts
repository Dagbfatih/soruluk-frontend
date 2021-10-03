import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionDetailsDto } from '../models/dtos/questionDetailsDto';
import { TestDetailsDto } from '../models/dtos/testDetailsDto';
import { Test } from '../models/entities/test';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class TestAddService {
  addedTest: TestDetailsDto = {
    questions: [],
    userName: '',
    test: {
      id: null!,
      date: null!,
      description: '',
      difficultyLevel: null!,
      lessonId: null!,
      privacy: true,
      testTime: null!,
      title: '',
      userId: this.tokenService.getUserWithJWT().id,
    },
  };
  testAddMode: boolean = false;

  constructor(private tokenService: TokenService) {
    this.subscribeReload();
    this.getBackupData();
  }

  setAddMode(testAddMode: boolean) {
    this.testAddMode = testAddMode;
  }

  getTestAddMode(): boolean {
    return this.testAddMode;
  }

  getTest(): TestDetailsDto {
    return this.addedTest;
  }

  setTest(test: TestDetailsDto) {
    this.addedTest = test;
  }

  setOnlyTest(test: Test) {
    this.addedTest.test = test;
  }

  setQuestions(questions: QuestionDetailsDto[]) {
    this.addedTest.questions = questions;
  }

  // Refresh Protection

  subscribeReload() {
    window.onbeforeunload = () => {
      this.backupData();
    };
  }

  backupData() {
    sessionStorage.setItem('testAddForm', JSON.stringify(this.addedTest));
  }

  getBackupData() {
    let data = sessionStorage.getItem('testAddForm');
    if (data !== null) {
      this.addedTest = JSON.parse(data);
      sessionStorage.removeItem('testAddForm');
    }
  }
}
