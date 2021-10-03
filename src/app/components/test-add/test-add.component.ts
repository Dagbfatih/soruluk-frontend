import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { QuestionDetailsDto } from 'src/app/models/dtos/questionDetailsDto';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { Question } from 'src/app/models/entities/question';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestAddService } from 'src/app/services/test-add.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css'],
})
export class TestAddComponent implements OnInit {
  addedTest: TestDetailsDto = {} as TestDetailsDto;
  testAddForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private router: Router,
    private testAddService: TestAddService
  ) {}

  ngOnInit(): void {
    this.addedTest = this.testAddService.getTest();
    this.createTestAddForm();
  }

  createTestAddForm() {
    this.testAddForm = this.formBuilder.group({
      title: [this.addedTest.test.title, Validators.required],
      description: [this.addedTest.test.description, Validators.required],
      testTime: [this.addedTest.test.testTime, Validators.required],
      privacy: [this.addedTest.test.privacy, Validators.required],
    });
  }

  getTest(): TestDetailsDto {
    return this.testAddService.getTest();
  }

  setTest() {
    let test: TestDetailsDto = {} as TestDetailsDto;
    test.test = Object.assign({}, this.testAddForm.value);
    test.test.userId = this.tokenService.getUserWithJWT().id;

    this.testAddService.setAddMode(true);
    this.testAddService.setOnlyTest(test.test);
  }

  navigateSelectQuestions() {
    if (this.testAddForm.valid) {
      this.setTest();
      this.router.navigate(['user/tests/add/select-questions']);
    } else {
      this.submitted = true;
    }
  }

  checkPrivacy(): boolean {
    return this.testAddForm.get('privacy')?.value;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  get getControls() {
    return this.testAddForm.controls;
  }
}
