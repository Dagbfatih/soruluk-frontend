import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit {
  tests: TestDetailsDto[] = [];
  dataLoaded = false;
  filterText = '';
  title = 'ng-carousel-demo';
  minTime: number = 0;
  maxTime: number = 0;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['previous', 'next'],
    responsive: {
      0: { items: 1 },
    },
    nav: true,
  };

  constructor(
    private testService: TestService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private tokenService:TokenService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['minTime'] || params['maxTime']) {
        this.getDetailsByMinAndMaxTime(params['minTime'], params['maxTime']);
      } else {
        this.getTestsDetailsByPublic();
      }
    });
  }

  getDetailsByMinAndMaxTime(minTime: number, maxTime: number) {
    this.testService
      .getTestDetailsByPublic()
      .subscribe((response) => {
        this.tests = response.data.filter(
          (t) => t.testTime >= minTime && t.testTime <= maxTime
        );
        this.dataLoaded = true;
      });
  }

  getUrl() {
    return this.router.url;
  }

  getTestsDetailsByPublic() {
    this.testService.getTestDetailsByPublic().subscribe(
      (response) => {
        this.tests = response.data;
        this.dataLoaded = true;
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }
 

  getFilterRouterClass(): string {
    if (
      this.minTime >= 0 &&
      this.minTime != undefined &&
      this.maxTime >= 0 &&
      this.maxTime != undefined
    ) {
      return '/tests/details/' + this.minTime + '/' + this.maxTime;
    } else {
      return '/tests/details';
    }
  }
  
  getUserRoles(){
    return this.tokenService.getUserRolesWithJWTFromCookie();
  }

  userRolesContains(claim:string):boolean{
    return this.getUserRoles().includes(claim);
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
