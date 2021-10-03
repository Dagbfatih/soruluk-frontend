import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { ProfileImage } from 'src/app/models/entities/profileImage';
import { ErrorService } from 'src/app/services/error.service';
import { OptionNumberGeneratorService } from 'src/app/services/option-number-generator.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit {
  tests: TestDetailsDto[] = [];
  profileImages: ProfileImage[] = [];
  baseUrl = environment.baseUrl;
  dataLoaded = false;
  filterText = '';

  constructor(
    private testService: TestService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private optionNumberGenerator: OptionNumberGeneratorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private profileImageService: ProfileImageService
  ) {}

  ngOnInit(): void {
    this.getAllTestDetails();
  }

  getAllTestDetails() {
    this.testService.getTestDetailsByPublic().subscribe((response) => {
      this.tests = response.data;
      this.dataLoaded = true;
      this.getProfileImages();
    });
  }

  getProfileImages() {
    this.profileImageService
      .getAllByUsers(this.tests.map((t) => t.test.userId))
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

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
