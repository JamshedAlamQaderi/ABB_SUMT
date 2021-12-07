import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../classes/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  rememberMe: Boolean = false;
  rememberMeBtnStatus: String = '';
  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private admin: AdminService,
    private notification: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toggleRememberMeStatus();
    if (this.auth.isLoggedIn()) {
      this.getAdminDetails();
    }
  }

  login() {
    const loginData: LoginModel = {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe,
    };
    this.auth.login(loginData).subscribe((res) => {
      if (res.error) {
        this.notification.error(
          'Login Error',
          res.error,
          environment.noticationConfig
        );
      } else {
        this.auth.saveToken(res.JWT_TOKEN);
        this.getAdminDetails();
      }
    });
  }

  getAdminDetails() {
    this.admin.getMyDetail().subscribe((res) => {
      if (res.error) {
        this.notification.error(
          'User Error',
          res.error,
          environment.noticationConfig
        );
      } else {
        if (res.success.length > 0) {
          let adminDetail = res.success[0];
          this.admin.myDetails = {
            adminId: adminDetail.id,
            adminRole: adminDetail.role,
            adminUsername: adminDetail.username,
          };
          this.router.navigate(['/dashboard']);
          this.notification.success(
            'Login Success',
            'Successfully logged In, Redirecting...',
            environment.noticationConfig
          );
        } else {
          this.notification.error(
            'User Error',
            'No admin data found!',
            environment.noticationConfig
          );
        }
      }
    });
  }

  toggleRememberMe() {
    if (this.rememberMe) {
      this.rememberMe = false;
      this.toggleRememberMeStatus();
    } else {
      this.rememberMe = true;
      this.toggleRememberMeStatus();
    }
  }

  toggleRememberMeStatus() {
    if (this.rememberMe) {
      this.rememberMeBtnStatus = 'Remembered';
    } else {
      this.rememberMeBtnStatus = 'Remember me';
    }
  }
}
