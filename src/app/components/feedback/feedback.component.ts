import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
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
  fromAddressesArray: FormArray;
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
      fromAddresses: this.formBuilder.array([this.createMailAddress()]),
    });

    this.fromAddressesArray = this.giveFeedbackForm.get(
      'fromAddresses'
    ) as FormArray;
  }

  createMailAddress(): FormGroup {
    return this.formBuilder.group({
      name: [this.user.firstName + ' ' + this.user.lastName],
      address: ['', Validators.required],
    });
  }

  giveFeedback() {
    if (this.giveFeedbackForm.valid) {
      let emailMessageModel: EmailMessage = Object.assign(
        {},
        this.giveFeedbackForm.value
      );

      emailMessageModel = this.setEmail(emailMessageModel);

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

  setEmail(emailMessageModel: EmailMessage): EmailMessage {
    let date = new Date();

    emailMessageModel.subject += ' - Feedback';

    emailMessageModel.content +=
      '<label>' +
      '<br><br>' +
      'Email: ' +
      emailMessageModel.fromAddresses[0].address +
      '<br>' +
      'Name: ' +
      '<a>' +
      emailMessageModel.fromAddresses[0].name +
      '</a>' +
      '<br>' +
      '</label>' +
      'Feedback ' +
      '<a>' +
      date.getDay() +
      '.' +
      date.getMonth() +
      '.' +
      date.getFullYear() +
      ' - ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds() +
      '</a>' +
      ' Tarihinde gönderildi';

    return emailMessageModel;
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }
}
