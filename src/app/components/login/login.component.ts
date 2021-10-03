import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { TokenService } from 'src/app/services/token.service';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { LoginModel } from 'src/app/models/entities/loginModel';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/models/entities/token';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private cookieService: CookieManageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private router: Router,
    private pageService: PageService,
    private tokenService: TokenService,
    private refreshTokenService: RefreshTokenService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          loginModel.rememberMe
            ? this.setTokenOnLocal(response.data)
            : this.setTokenOnSession(response.data);
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
          console.log(response.data.accessToken.token);
          this.router.navigate(['/']);
        }
      );
    }
  }

  setTokenOnLocal(response: Token) {
    this.tokenService.setLocal(response.accessToken.token);
    this.refreshTokenService.setLocal(response.refreshToken.token);
  }

  setTokenOnSession(response: Token) {
    this.tokenService.setSession(response.accessToken.token);
    this.refreshTokenService.setSession(response.refreshToken.token);
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
