import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DevArchitectureHomePageComponent } from './components/dev-architecture-home-page/dev-architecture-home-page.component';
import { DevArchitectureTutorialComponent } from './components/dev-architecture-tutorial/dev-architecture-tutorial.component';
import { ExamComponent } from './components/exam/exam.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OperationClaimComponent } from './components/operation-claim/operation-claim.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuestionAddComponent } from './components/question-add/question-add.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { QuestionComponent } from './components/question/question.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterTeacherComponent } from './components/register-teacher/register-teacher.component';
import { RegisterComponent } from './components/register/register.component';
import { SelectQuestionsComponent } from './components/select-questions/select-questions.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SolveTestComponent } from './components/solve-test/solve-test.component';
import { TestAddConfirmComponent } from './components/test-add-confirm/test-add-confirm.component';
import { TestAddComponent } from './components/test-add/test-add.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { TestComponent } from './components/test/test.component';
import { UserOperationClaimComponent } from './components/user-operation-claim/user-operation-claim.component';
import { UserQuestionsComponent } from './components/user-questions/user-questions.component';
import { UserResultsComponent } from './components/user-results/user-results.component';
import { UserTestsComponent } from './components/user-tests/user-tests.component';
import { AdminGuard } from './guards/admin.guard';
import { ExamGuard } from './guards/exam.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: { animation: 'Home' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'Home' },
  },
  { path: 'questions', component: QuestionComponent },
  {
    path: 'questions/details',
    component: QuestionDetailsComponent,
    data: { animation: 'Home' },
  },
  {
    path: 'questions/details/:categoryId',
    component: QuestionDetailsComponent,
  },
  { path: 'tests', component: TestComponent },
  {
    path: 'tests/details',
    component: TestDetailsComponent,
    data: { animation: 'Home' },
  },
  {
    path: 'tests/details/:minTime/:maxTime',
    component: TestDetailsComponent,
    data: { animation: 'Home' },
  },
  { path: 'login', component: LoginComponent, data: { animation: 'Home' } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'About' },
  },
  {
    path: 'register/student',
    component: RegisterStudentComponent,
    data: { animation: 'Contact' },
  },
  {
    path: 'register/instructor',
    component: RegisterTeacherComponent,
    data: { animation: 'Contact' },
  },
  { path: 'questions/add', component: QuestionAddComponent },
  {
    path: 'user/tests/add/select-questions',
    component: SelectQuestionsComponent,
    data: { animation: 'Contact' },
  },
  {
    path: 'user/tests/add',
    component: TestAddComponent,
    data: { animation: 'Home' },
  },
  {
    path: 'user/tests/add/confirm',
    component: TestAddConfirmComponent,
    data: { animation: 'About' },
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user/profile/edit',
    component: ProfileEditComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user/questions',
    component: UserQuestionsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user/tests',
    component: UserTestsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user/tests/:minTime/:maxTime',
    component: UserTestsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'devarchitecture/homepage',
    component: DevArchitectureHomePageComponent,
  },
  {
    path: 'devarchitecture/tutorial',
    component: DevArchitectureTutorialComponent,
  },
  {
    path: 'user/questions/:categoryId',
    component: UserQuestionsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'tests/solve/:testId',
    component: SolveTestComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'exam/:testId',
    component: ExamComponent,
    canDeactivate: [ExamGuard],
  },
  {
    path: 'user/results',
    component: UserResultsComponent,
    canActivate: [LoginGuard],
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/users',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/userClaims',
    component: UserOperationClaimComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/claims',
    component: OperationClaimComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { animation: 'Home' },
  },
  {
    path: 'give-feedback',
    component: FeedbackComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
