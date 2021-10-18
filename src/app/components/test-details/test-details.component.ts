import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { CustomerDetailsDto } from 'src/app/models/dtos/customerDetailsDto';
import { TestDetailsDto } from 'src/app/models/dtos/testDetailsDto';
import { ProfileImage } from 'src/app/models/entities/profileImage';
import { CustomerService } from 'src/app/services/customer.service';
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
  customers: CustomerDetailsDto[] = [];

  constructor(
    private testService: TestService,
    private errorService: ErrorService,
    private profileImageService: ProfileImageService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getAllTestDetails();
  }

  getCustomers() {
    this.customerService
      .getAllByUsers(this.tests.map((t) => t.test.userId))
      .subscribe((response) => {
        this.customers = response.data;
      });
  }

  getAllTestDetails() {
    this.testService.getTestDetailsByPublic().subscribe((response) => {
      this.tests = response.data;
      this.dataLoaded = true;
      this.getCustomers();
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

  getCustomer(userId: number): CustomerDetailsDto {
    return this.customers.find((c) => c.customerDetails.userId == userId)!;
  }

  getProfileImage(userId: number): ProfileImage {
    return this.profileImages.find((i) => i.userId == userId)!;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
