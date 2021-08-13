import { Component, OnInit } from '@angular/core';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { CustomerDetailsDto } from 'src/app/models/dtos/customerDetailsDto';
import { ProfileImage } from 'src/app/models/entities/ProfileImage';
import { User } from 'src/app/models/entities/user';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileImage: ProfileImage = {} as ProfileImage;
  baseUrl = environment.baseUrl;
  customer: CustomerDetailsDto = {} as CustomerDetailsDto;

  constructor(
    private tokenService: TokenService,
    private profileImageService: ProfileImageService,
    private userService: UserService,
    private errorService: ErrorService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getUserProfileImage();
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.customerService
      .getDetailsByUser(this.tokenService.getUserWithJWTFromCookie().id)
      .subscribe(
        (response) => {
          this.customer = response.data;
          console.log(this.customer.roleName)
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
  }

  isLog(): boolean {
    if (this.tokenService.getTokenFromCookie() !== null) {
      return true;
    }
    return false;
  }

  getUserProfileImage() {
    this.profileImageService
      .getProfileImageByUser(this.tokenService.getUserWithJWTFromCookie().id)
      .subscribe((response) => {
        this.profileImage = response.data;
        console.log(this.profileImage);
      });
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  getIsConfirmed(): string {
    let roles = this.tokenService.getUserRolesWithJWTFromCookie();
    if (!roles.includes('notConfirmedInstructor') && roles.includes("Instructor")) {
      return '';
    }
    return ' (waiting confirmation...)';
  }
  
}
