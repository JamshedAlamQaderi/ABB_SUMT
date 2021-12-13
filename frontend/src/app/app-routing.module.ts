import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AuthGuard } from './auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { LoginComponent } from './login/login.component';
import { ShowUserDetailsComponent } from './show-user-details/show-user-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-details',
    component: AdminDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-new-admin',
    component: CreateAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-user-details',
    component: EditUserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'show-user-details',
    component: ShowUserDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
