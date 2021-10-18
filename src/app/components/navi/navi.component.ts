import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { CustomerDetailsDto } from 'src/app/models/dtos/customerDetailsDto';
import { LanguagePath } from 'src/app/models/entities/languagePath';
import { ProfileImage } from 'src/app/models/entities/profileImage';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  user: User;
  profileImage: ProfileImage = {} as ProfileImage;
  baseUrl = environment.baseUrl;
  profileImageLoaded = false;
  customer: CustomerDetailsDto;
  flagPaths: LanguagePath[] = [
    { path: 'Flags/turkish-flag.png', code: 'tr-TR' },
    { path: 'Flags/english-flag.png', code: 'en-US' },
  ];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private profileImageService: ProfileImageService,
    private toastrService: ToastrService,
    private router: Router,
    private settingsService: SettingsService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUserWithJWT();
    this.isLog() ? this.getUserProfileImage() : null;
    this.isLog() ? this.getCustomer() : null;
  }

  getCustomer() {
    this.customerService
      .getDetailsByUser(this.user.id)
      .subscribe((response) => {
        this.customer = response.data;
      });
  }

  checkRouterContains(searchedItem: string): boolean {
    return this.router.url.includes(searchedItem);
  }

  isLog(): boolean {
    if (this.tokenService.get()) {
      return true;
    }
    return false;
  }

  getUserRoles(): string[] {
    return this.tokenService.getUserRolesWithJWT();
  }

  userRolesContains(claim: string): boolean {
    return this.getUserRoles().includes(claim);
  }

  signOut() {
    this.authService.signOut();
    sessionStorage.removeItem('adminCurrentPage');
    this.toastrService.info('Going to homepage...', 'Logged Out');
    this.router.navigate(['']);
  }

  getUserName() {
    return this.user.firstName + ' ' + this.user.lastName;
  }

  getUserProfileImage() {
    this.profileImageService
      .getProfileImageByUser(this.user.id)
      .subscribe((response) => {
        this.profileImage = response.data;
        this.profileImageLoaded = true;
      });
  }

  getTranslates(key: string) {
    return alltranslates.get(key);
  }

  setLanguage(languageCode: string) {
    this.settingsService.setLanguage(languageCode);
    window.location.reload();
  }

  userIsAdmin(): boolean {
    return this.tokenService.getUserRolesWithJWT().includes('admin');
  }

  getLanguageCodeFromLocalStorage(): string {
    return this.settingsService.getLanguageCodeFromLocalStorage();
  }

  findFlagPathByCode(): string {
    return this.flagPaths.find(
      (f) => f.code == this.getLanguageCodeFromLocalStorage()
    )?.path!;
  }

  getLanguageFlagUrl(path: string): string {
    return this.baseUrl + path;
  }
}
