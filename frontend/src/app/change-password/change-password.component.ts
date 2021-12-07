import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { IChangePassword } from '../classes/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePassword: IChangePassword = {} as IChangePassword;
  constructor(
    private router: Router,
    private notification: NotificationsService,
    private admin: AdminService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  submit() {
    if (
      this.changePassword.currentPassword &&
      this.changePassword.currentPassword !== '' &&
      this.changePassword.newPassword &&
      this.changePassword.newPassword !== '' &&
      this.changePassword.confirmPassword &&
      this.changePassword.confirmPassword !== ''
    ) {
      if (
        this.changePassword.newPassword === this.changePassword.confirmPassword
      ) {
        this.admin.changePassword(this.changePassword).subscribe((res) => {
          if (res.error) {
            this.notification.error(
              'Server Error',
              res.error,
              environment.noticationConfig
            );
          } else if (res.success) {
            this.notification.success(
              'Success',
              res.success,
              environment.noticationConfig
            );
            this.auth.logout();
            this.router.navigate(['/login']);
          } else {
            this.notification.error(
              'Unknow Error',
              'Unknow error found! please contact with technician',
              environment.noticationConfig
            );
          }
        });
      } else {
        this.notification.error(
          'Password Mismatch',
          'new password & confirm password do not match',
          environment.noticationConfig
        );
      }
    } else {
      this.notification.warn(
        'Empty fields',
        'Please fill the fields in order to change password',
        environment.noticationConfig
      );
    }
  }
}
