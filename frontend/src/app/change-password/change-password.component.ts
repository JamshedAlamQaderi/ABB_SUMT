import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IChangePassword } from '../classes/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePassword: IChangePassword = new IChangePassword();
  constructor(private route: Router) {}

  ngOnInit(): void {}

  goBack() {
    this.route.navigate(['/dashboard']);
  }

  submit() {
    // do password change api call
    console.log(
      'Current Password: ',
      this.changePassword.currentPassword,
      'New Password: ',
      this.changePassword.newPassword,
      'Confirm Password: ',
      this.changePassword.confirmPassword
    );
  }
}
