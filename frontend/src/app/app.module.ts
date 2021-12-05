import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminDetailCardComponent } from './admin-detail-card/admin-detail-card.component';
import { UserDetailCardComponent } from './user-detail-card/user-detail-card.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    AdminDetailsComponent,
    UserDetailsComponent,
    ChangePasswordComponent,
    AdminDetailCardComponent,
    UserDetailCardComponent,
    EditUserDetailsComponent,
    CreateAdminComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, MatSelectModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
