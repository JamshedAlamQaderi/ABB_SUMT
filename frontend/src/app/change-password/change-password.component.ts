import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: String = '';
  newPassword: String = '';
  confirmPassword: String = '';

  constructor(private route: Router) {

  }

  ngOnInit(): void {}

  goBack(){
    this.route.navigate(['/dashboard'])
  }

  submit() {
    // do password change api call
    console.log(
      'Current Password: ',
      this.currentPassword,
      'New Password: ',
      this.newPassword,
      'Confirm Password: ',
      this.confirmPassword
    );
  }
}
