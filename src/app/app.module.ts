import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OperationsComponent } from './operations/operations.component';
import { canActivate } from './services/auth-guard.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { PatientsComponent } from './patients/patients.component';
import { TeamMemberComponent } from './team-member/team-member.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'operations', component: OperationsComponent, canActivate: [canActivate]},
  { path: 'patients', component: PatientsComponent, canActivate: [canActivate]},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    OperationsComponent,
    PatientsComponent,
    TeamMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
