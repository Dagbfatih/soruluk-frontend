import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
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
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SolveTestComponent } from './components/solve-test/solve-test.component';
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
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'questions/details', component: QuestionDetailsComponent },
  {
    path: 'questions/details/:categoryId',
    component: QuestionDetailsComponent,
  },
  { path: 'tests', component: TestComponent },
  { path: 'tests/details', component: TestDetailsComponent },
  { path: 'tests/details/:minTime/:maxTime', component: TestDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'questions/add', component: QuestionAddComponent },
  { path: 'tests/add', component: TestAddComponent },
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
  },
  {
    path: 'give-feedback',
    component: FeedbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
