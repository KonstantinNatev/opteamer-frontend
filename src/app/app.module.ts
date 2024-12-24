import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { canActivate } from './services/auth-guard.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { PatientsComponent } from './patients/patients.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { OperationTypeComponent } from './operation-type/operation-type.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { RoomInventoryComponent } from './room-inventory/room-inventory.component';
import { OperationRoomComponent } from './operation-room/operation-room.component';
import { OperationComponent } from './operation/operation.component';
import { OperationReportsComponent } from './operation-reports/operation-reports.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'patients', component: PatientsComponent, canActivate: [canActivate]},
  { path: 'team-members', component: TeamMemberComponent, canActivate: [canActivate]},
  { path: 'operation-types', component: OperationTypeComponent, canActivate: [canActivate]},
  { path: 'assessments', component: AssessmentComponent, canActivate: [canActivate]},
  { path: 'room-inventory', component: RoomInventoryComponent, canActivate: [canActivate]},
  { path: 'operation-rooms', component: OperationRoomComponent, canActivate: [canActivate]},
  { path: 'operations', component: OperationComponent, canActivate: [canActivate]},
  { path: 'operation-reports', component: OperationReportsComponent, canActivate: [canActivate]},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PatientsComponent,
    TeamMemberComponent,
    OperationTypeComponent,
    AssessmentComponent,
    RoomInventoryComponent,
    OperationRoomComponent,
    OperationComponent,
    OperationReportsComponent
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
