import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { QuestionService } from 'src/app/services/question.service';
import { TestAddService } from 'src/app/services/test-add.service';
import { TokenService } from 'src/app/services/token.service';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { ProfileImage } from 'src/app/models/entities/profileImage';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { Test } from 'src/app/models/entities/test';

@Component({
  selector: 'app-select-questions',
  templateUrl: './select-questions.component.html',
  styleUrls: ['./select-questions.component.css'],
})
export class SelectQuestionsComponent implements OnInit, OnDestroy {
  questions: QuestionDetailsDto[] = [];
  profileImages: ProfileImage[] = [];
  dataLoaded: boolean = false;

  filterText: string = '';
  optionNumberFilter: number;
  pageSize: number = 9;
  page: number = 1;
  collectionSize: number = 1;

  baseUrl = environment.baseUrl;

  test: TestDetailsDto;

  constructor(
    private questionservice: QuestionService,
    private testAddService: TestAddService,
    private profileImageService: ProfileImageService,
    private errorService: ErrorService,
    private optionNumberGenerator: OptionNumberGeneratorService
  ) {}

  ngOnInit(): void {
    this.getTest();
    this.getAllQuestionDetails();
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('testAddForm');
  }

  getTest() {
    this.test = this.testAddService.getTest();
  }

  getAllQuestionDetails() {
    this.questionservice.getAllDetailsByPublic().subscribe((response) => {
      this.questions = response.data;
      this.dataLoaded = true;
      this.getProfileImages();
      this.setCollectionSize();
    });
  }

  setCollectionSize() {
    this.collectionSize = this.questions.length;
  }

  getProfileImages() {
    this.profileImageService
      .getAllByUsers(this.questions.map((q) => q.question.userId))
      .subscribe(
        (response) => {
          this.profileImages = response.data;
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
  }

  getProfileImage(userId: number): ProfileImage {
    return this.profileImages.find((i) => i.userId == userId)!;
  }

  getOption(index: number) {
    return this.optionNumberGenerator.getOptionNumber(index);
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  addQuestion(question: QuestionDetailsDto) {
    this.test.questions.push(question);
    this.setQuestions();
  }

  removeQuestion(questionId: number) {
    this.test.questions = this.test.questions.filter(
      (item) => item.question.questionId !== questionId
    );
    this.setQuestions();
  }

  setQuestions() {
    this.testAddService.setQuestions(this.test.questions);
  }

  ifQuestionExists(questionId: number): boolean {
    return this.test.questions
      .map((q) => q.question.questionId)
      .includes(questionId);
  }

  clearAllQuestions() {
    this.test.questions = [];
    this.setQuestions();
  }
}
