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
    private tokenService: TokenService
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
            ? this.tokenService.setTokenOnCookie(response.data.token)
            : this.tokenService.setTokenOnSession(response.data.token);

          this.toastrService.success('Giriş Başarılı');
          this.router.navigate(["/tests/details"]);
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
