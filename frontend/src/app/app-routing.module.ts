import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  //{ path: '', component: LoginComponent }, // if logged in than go to dashboard either go to login
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'admin-details', component: AdminDetailsComponent },
  { path: 'create-new-admin', component: CreateAdminComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'edit-user-details', component: EditUserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
