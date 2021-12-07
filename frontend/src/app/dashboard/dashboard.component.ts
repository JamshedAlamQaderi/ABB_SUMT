import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentAdminRole: String = '';
  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.currentAdminRole = this.admin.myDetails.adminRole;
  }
}
