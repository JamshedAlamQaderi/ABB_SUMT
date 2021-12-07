import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userRole: String = '';
  constructor(
    private auth: AuthService,
    private admin: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //api call for check is admin or moderator
    let adminDetail = this.admin.myDetails;
    this.userRole = adminDetail.adminRole;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
