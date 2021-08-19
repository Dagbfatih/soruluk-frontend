import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { ErrorService } from 'src/app/services/error.service';
import { TestService } from 'src/app/services/test.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css'],
})
export class SolveTestComponent implements OnInit {
  test: TestDetailsDto = {} as TestDetailsDto;
  dataLoaded = false;

  constructor(
    private testService: TestService,
    private router: Router,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['testId']) {
        this.getTestDetails(params['testId']);
      } else {
        this.toastrService.error('Not found test', environment.errorMessage);
      }
    });
  }

  getTestDetails(id: number) {
    this.testService.getTestDetailsById(id).subscribe(
      (response) => {
        this.test = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  start() {
    if (this.test) {
      this.router.navigate(['/exam/' + encodeURIComponent(this.test.testId)]);
      localStorage.removeItem('testResult');
      localStorage.removeItem('testTime');
    } else {
      this.toastrService.error('Test error', environment.errorMessage);
    }
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
