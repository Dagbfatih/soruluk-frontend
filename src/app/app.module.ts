import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { QuestionComponent } from './components/question/question.component';
import { TestComponent } from './components/test/test.component';
import { OptionComponent } from './components/option/option.component';
import { UserComponent } from './components/user/user.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { ToastrModule } from 'ngx-toastr';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CookieModule, CookieService } from 'ngx-cookie';
import { TestFilterPipePipe } from './pipes/test-filter-pipe.pipe';
import { QuestionFilterPipePipe } from './pipes/question-filter-pipe.pipe';
import { MinutePipePipe } from './pipes/minute-pipe.pipe';
import { LoginComponent } from './components/login/login.component';
import { QuestionAddComponent } from './components/question-add/question-add.component';
import { TestAddComponent } from './components/test-add/test-add.component';
import { OptionPipePipe } from './pipes/option-pipe.pipe';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserQuestionsComponent } from './components/user-questions/user-questions.component';
import { UserTestsComponent } from './components/user-tests/user-tests.component';
import { QuestionUpdateComponent } from './components/question-update/question-update.component';
import { QuestionDeleteComponent } from './components/question-delete/question-delete.component';
import { TestUpdateComponent } from './components/test-update/test-update.component';
import { TestDeleteComponent } from './components/test-delete/test-delete.component';
import { SolveTestComponent } from './components/solve-test/solve-test.component';
import { ExamComponent } from './components/exam/exam.component';
import { ConfirmationDialogComponent } from './modals/confirmation-dialog/confirmation-dialog.component';
import { CountdownModule } from 'ngx-countdown';
import { NgxTimerModule } from 'ngx-timer';
import { FinishConfirmModalComponent } from './modals/finish-confirm-modal/finish-confirm-modal.component';
import { UserResultsComponent } from './components/user-results/user-results.component';
import { UserResultDetailsComponent } from './components/user-result-details/user-result-details.component';
import { AdminComponent } from './components/admin/admin.component';
import {
  NgbCarouselModule,
  NgbDropdownModule,
  NgbModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OperationClaimAddComponent } from './components/operation-claim-add/operation-claim-add.component';
import { OperationClaimComponent } from './components/operation-claim/operation-claim.component';
import { UserOperationClaimComponent } from './components/user-operation-claim/user-operation-claim.component';
import { UserOperationClaimAddComponent } from './components/user-operation-claim-add/user-operation-claim-add.component';
import { OperationClaimDeleteComponent } from './components/operation-claim-delete/operation-claim-delete.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { UserOperationClaimDeleteComponent } from './components/user-operation-claim-delete/user-operation-claim-delete.component';
import { LanguageComponent } from './components/language/language.component';
import { TranslateComponent } from './components/translate/translate.component';
import { LanguageAddComponent } from './components/language-add/language-add.component';
import { LanguageDeleteComponent } from './components/language-delete/language-delete.component';
import { TranslateAddComponent } from './components/translate-add/translate-add.component';
import { TranslateDeleteComponent } from './components/translate-delete/translate-delete.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TranslateUpdateComponent } from './components/translate-update/translate-update.component';
import { LanguageUpdateComponent } from './components/language-update/language-update.component';
import { TranslateFilterPipePipe } from './pipes/translate-filter-pipe.pipe';
import { UserFilterPipePipe } from './pipes/user-filter-pipe.pipe';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
import { RoleComponent } from './components/role/role.component';
import { RoleAddComponent } from './components/role-add/role-add.component';
import { RoleDeleteComponent } from './components/role-delete/role-delete.component';
import { RoleUpdateComponent } from './components/role-update/role-update.component';
import { BranchComponent } from './components/branch/branch.component';
import { BranchAddComponent } from './components/branch-add/branch-add.component';
import { BranchDeleteComponent } from './components/branch-delete/branch-delete.component';
import { BranchUpdateComponent } from './components/branch-update/branch-update.component';
import { BranchFilterPipePipe } from './pipes/branch-filter-pipe.pipe';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterTeacherComponent } from './components/register-teacher/register-teacher.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { SelectQuestionsComponent } from './components/select-questions/select-questions.component';
import { TestAddService } from './services/test-add.service';
import { IocModule } from './modules/ioc/ioc.module';
import { ValdemortModule } from 'ngx-valdemort';
import { TestAddConfirmComponent } from './components/test-add-confirm/test-add-confirm.component';
import { DevArchitectureHomePageComponent } from './components/dev-architecture-home-page/dev-architecture-home-page.component';
import { DevArchitectureTutorialComponent } from './components/dev-architecture-tutorial/dev-architecture-tutorial.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { ProfileInfoUpdateComponent } from './components/profile-info-update/profile-info-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    QuestionComponent,
    TestComponent,
    OptionComponent,
    UserComponent,
    QuestionDetailsComponent,
    TestDetailsComponent,
    TestFilterPipePipe,
    QuestionFilterPipePipe,
    MinutePipePipe,
    LoginComponent,
    QuestionAddComponent,
    TestAddComponent,
    OptionPipePipe,
    ProfileEditComponent,
    ProfileComponent,
    RegisterComponent,
    UserQuestionsComponent,
    UserTestsComponent,
    QuestionUpdateComponent,
    QuestionDeleteComponent,
    TestUpdateComponent,
    TestDeleteComponent,
    SolveTestComponent,
    ExamComponent,
    ConfirmationDialogComponent,
    FinishConfirmModalComponent,
    UserResultsComponent,
    UserResultDetailsComponent,
    AdminComponent,
    PageNotFoundComponent,
    OperationClaimAddComponent,
    OperationClaimComponent,
    UserOperationClaimComponent,
    UserOperationClaimAddComponent,
    OperationClaimDeleteComponent,
    UserDeleteComponent,
    UserOperationClaimDeleteComponent,
    LanguageComponent,
    TranslateComponent,
    LanguageAddComponent,
    LanguageDeleteComponent,
    TranslateAddComponent,
    TranslateDeleteComponent,
    SettingsComponent,
    TranslateUpdateComponent,
    LanguageUpdateComponent,
    TranslateFilterPipePipe,
    UserFilterPipePipe,
    FeedbackComponent,
    HomeComponent,
    RoleComponent,
    RoleAddComponent,
    RoleDeleteComponent,
    RoleUpdateComponent,
    BranchComponent,
    BranchAddComponent,
    BranchDeleteComponent,
    BranchUpdateComponent,
    BranchFilterPipePipe,
    RegisterStudentComponent,
    RegisterTeacherComponent,
    AppFooterComponent,
    SelectQuestionsComponent,
    TestAddConfirmComponent,
    DevArchitectureHomePageComponent,
    DevArchitectureTutorialComponent,
    AboutUsComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    ProfileInfoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxTimerModule,
    CountdownModule,
    NgbModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbPopoverModule,
    ValdemortModule,
    IocModule,
    CookieModule.forRoot({
      secure: true,
      sameSite: 'strict',
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
