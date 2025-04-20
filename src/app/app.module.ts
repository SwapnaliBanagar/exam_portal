import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/components/navbar/navbar.component';
import { FooterComponent } from './components/components/footer/footer.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AdminHomePageComponent } from './pages/admin/admin-home-page/admin-home-page.component';
import {MatTableModule} from '@angular/material/table';
import { CategoryComponent } from './pages/admin/category/category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddQuestionComponent } from './pages/admin/questions/add-question/add-question.component';
import { GetAllQuestionComponent } from './pages/admin/questions/get-all-question/get-all-question.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { UserHomePageComponent } from './pages/user/user-home-page/user-home-page.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GetAllUsersComponent } from './pages/admin/get-all-users/get-all-users.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    AdminDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    AdminHomePageComponent,
        CategoryComponent,
        AddQuestionComponent,
        GetAllQuestionComponent,
        UserDashboardComponent,
        UserSidebarComponent,
        UserHomePageComponent,
        StartQuizComponent,
        GetAllUsersComponent,
       
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatRadioModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
