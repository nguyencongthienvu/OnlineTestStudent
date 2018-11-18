import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//service
import { AuthService } from './services/auth.service';
import { PnotifyService } from './services/pnotify.service.service';
import { UrlServiceService } from './services/url-service.service';
import {ProfileServiceService} from './services/profile-service.service';
import {CourseServiceService} from './services/course-service.service';
//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ExamComponent } from './components/exam/exam.component';
import { TakeexamComponent } from './components/takeexam/takeexam.component';
import { DoexamComponent } from './components/doexam/doexam.component';
import { ChangeProfileComponent } from './components/change-profile/change-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ExamComponent,
    TakeexamComponent,
    DoexamComponent,
    ChangeProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      {path: 'home',component:HomeComponent},
      {path:'exam',component:ExamComponent},
      {path:'takeexam',component:TakeexamComponent},
      {path: 'doexam',component:DoexamComponent},
      {path: 'change-profile', component:ChangeProfileComponent}
    ])
  ],
  providers: [AuthService,PnotifyService,UrlServiceService,ProfileServiceService,CourseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
