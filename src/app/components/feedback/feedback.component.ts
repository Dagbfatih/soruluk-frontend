import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { EmailMessage } from 'src/app/models/entities/emailMessage';
import { User } from 'src/app/models/entities/user';
import { EmailService } from 'src/app/services/email.service';
import { ErrorService } from 'src/app/services/error.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  giveFeedbackForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private userService: UserService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createGiveFeedbackForm();
  }

  getUser() {
    this.user = this.tokenService.getUserWithJWTFromCookie();
  }

  createGiveFeedbackForm() {
    this.giveFeedbackForm = this.formBuilder.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  giveFeedback() {
    if (this.giveFeedbackForm.valid) {
      let emailMessageModel: EmailMessage = Object.assign(
        {},
        this.giveFeedbackForm.value
      );
      emailMessageModel.fromAddresses = [
        {
          name: this.user.firstName + ' ' + this.user.lastName,
          address: this.user.email,
        },
      ];
      emailMessageModel.subject += ' - Feedback';

      this.emailService.send(emailMessageModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            environment.successMessage
          );
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
