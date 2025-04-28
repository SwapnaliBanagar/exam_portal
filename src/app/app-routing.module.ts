import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './components/components/navbar/navbar.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { authGuard } from './guard/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminHomePageComponent } from './pages/admin/admin-home-page/admin-home-page.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { AddQuestionComponent } from './pages/admin/questions/add-question/add-question.component';
import { GetAllQuestionComponent } from './pages/admin/questions/get-all-question/get-all-question.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserHomePageComponent } from './pages/user/user-home-page/user-home-page.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { GetAllUsersComponent } from './pages/admin/get-all-users/get-all-users.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  //if the user is login then only  work this path using authGuard
  {
    path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard],
    children: [
      { path: '', component: AdminHomePageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'addQuestion', component: AddQuestionComponent },
      { path: 'getAllQuestions', component: GetAllQuestionComponent },
      { path: 'allUsers', component: GetAllUsersComponent },
    ]
  },

  {
    path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard],
    children: [
      { path: '', component: UserHomePageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'startQuiz', component: StartQuizComponent },
    ]
  },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
