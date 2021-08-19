import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { ProfileImage } from 'src/app/models/entities/ProfileImage';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';
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

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private profileImageService: ProfileImageService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLog() ? this.getUserProfileImage() : null;
  }

  checkRouterContains(searchedItem: string): boolean {
    return this.router.url.includes(searchedItem);
  }

  isLog(): boolean {
    if (this.tokenService.getTokenFromCookie() !== null) {
      return true;
    }
    return false;
  }

  getUserRoles(): string[] {
    return this.tokenService.getUserRolesWithJWTFromCookie();
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
    this.user = this.tokenService.getUserWithJWTFromCookie();
    return this.user.firstName + ' ' + this.user.lastName;
  }

  getUserProfileImage() {
    this.profileImageService
      .getProfileImageByUser(this.tokenService.getUserWithJWTFromCookie().id)
      .subscribe((response) => {
        this.profileImage = response.data;
      });
  }

  getTranslates(key: string) {
    return alltranslates.get(key);
  }

  userIsAdmin() {
    return this.tokenService.getUserRolesWithJWTFromCookie().includes('admin');
  }
}
