import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.toggleRememberMeStatus();
  }

  login() {
    const userData = { username: this.username, password: this.password };
    // api login
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
